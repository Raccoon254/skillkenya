import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { generateVerificationCode, sendVerificationCodeEmail } from '$lib/server/email/services';
import { z } from 'zod';

const requestSchema = z.object({
	email: z.string().email('Invalid email address')
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { email } = requestSchema.parse(body);

		// Check if email already exists and is verified
		const existing = await prisma.waitlistEntry.findUnique({
			where: { email }
		});

		if (existing?.verified) {
			console.log(`⚠️ Email ${email} is already verified and on the waitlist`);
			return json(
				{
					error: 'This email is already on the waitlist',
					alreadyOnWaitlist: true
				},
				{ status: 400 }
			);
		}

		// Generate verification code
		const verificationCode = generateVerificationCode();
		const verificationCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

		// Create or update waitlist entry
		if (existing) {
			await prisma.waitlistEntry.update({
				where: { email },
				data: {
					verificationCode,
					verificationCodeExpiry
				}
			});
		} else {
			await prisma.waitlistEntry.create({
				data: {
					email,
					verificationCode,
					verificationCodeExpiry,
					verified: false
				}
			});
		}

		// Send verification email
		const emailResult = await sendVerificationCodeEmail(email, verificationCode);

		if (!emailResult.success) {
			return json(
				{ error: 'Failed to send verification email. Please try again.' },
				{ status: 500 }
			);
		}

		return json({
			success: true,
			message: 'Verification code sent to your email'
		});
	} catch (error) {
		console.error('❌ Error requesting verification code:', error);
		console.error('Error details:', error instanceof Error ? error.message : error);
		console.error('Stack:', error instanceof Error ? error.stack : 'N/A');

		if (error instanceof z.ZodError) {
			return json(
				{ error: error.issues[0].message },
				{ status: 400 }
			);
		}

		return json(
			{
				error: 'An error occurred. Please try again.',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
};
