import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { sendWelcomeEmail } from '$lib/server/email/services';
import { z } from 'zod';

const verifySchema = z.object({
	email: z.string().email('Invalid email address'),
	code: z.string().length(6, 'Verification code must be 6 digits'),
	name: z.string().min(1, 'Name is required').optional(),
	phone: z.string().optional()
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { email, code, name, phone } = verifySchema.parse(body);

		// Find waitlist entry
		const entry = await prisma.waitlistEntry.findUnique({
			where: { email }
		});

		if (!entry) {
			return json(
				{ error: 'No verification code found for this email. Please request a new code.' },
				{ status: 404 }
			);
		}

		// Check if already verified
		if (entry.verified) {
			return json(
				{ error: 'This email is already verified and on the waitlist' },
				{ status: 400 }
			);
		}

		// Check if code matches
		if (entry.verificationCode !== code) {
			return json(
				{ error: 'Invalid verification code' },
				{ status: 400 }
			);
		}

		// Check if code has expired
		if (entry.verificationCodeExpiry && entry.verificationCodeExpiry < new Date()) {
			return json(
				{ error: 'Verification code has expired. Please request a new code.' },
				{ status: 400 }
			);
		}

		// Update entry as verified
		const updatedEntry = await prisma.waitlistEntry.update({
			where: { email },
			data: {
				verified: true,
				name: name || entry.name,
				phone: phone || entry.phone,
				verificationCode: null,
				verificationCodeExpiry: null
			}
		});

		// Send welcome email
		const userName = updatedEntry.name || 'there';
		await sendWelcomeEmail(updatedEntry.id, email, userName);

		return json({
			success: true,
			message: 'Successfully joined the waitlist!',
			entry: {
				id: updatedEntry.id,
				email: updatedEntry.email,
				name: updatedEntry.name,
				isOG: updatedEntry.isOG,
				createdAt: updatedEntry.createdAt
			}
		});
	} catch (error) {
		console.error('Error verifying code:', error);

		if (error instanceof z.ZodError) {
			return json(
				{ error: error.issues[0].message },
				{ status: 400 }
			);
		}

		return json(
			{ error: 'An error occurred. Please try again.' },
			{ status: 500 }
		);
	}
};
