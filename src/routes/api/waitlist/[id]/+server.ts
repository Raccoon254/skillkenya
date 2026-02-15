import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

const updateSchema = z.object({
	name: z.string().optional(),
	phone: z.string().optional(),
	isOG: z.boolean().optional(),
	verified: z.boolean().optional()
});

// PATCH /api/waitlist/[id] - Update waitlist entry
export const PATCH: RequestHandler = async ({ params, request }) => {
	try {
		const body = await request.json();
		const data = updateSchema.parse(body);

		const entry = await prisma.waitlistEntry.update({
			where: { id: params.id },
			data
		});

		return json({
			success: true,
			entry
		});
	} catch (error) {
		console.error('Error updating waitlist entry:', error);

		if (error instanceof z.ZodError) {
			return json(
				{ error: error.errors[0].message },
				{ status: 400 }
			);
		}

		return json(
			{ error: 'Failed to update waitlist entry' },
			{ status: 500 }
		);
	}
};

// DELETE /api/waitlist/[id] - Delete waitlist entry
export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await prisma.waitlistEntry.delete({
			where: { id: params.id }
		});

		return json({
			success: true,
			message: 'Waitlist entry deleted'
		});
	} catch (error) {
		console.error('Error deleting waitlist entry:', error);
		return json(
			{ error: 'Failed to delete waitlist entry' },
			{ status: 500 }
		);
	}
};
