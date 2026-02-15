import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

// GET /api/waitlist - Get all waitlist entries (admin)
export const GET: RequestHandler = async ({ url }) => {
	try {
		const page = parseInt(url.searchParams.get('page') || '1');
		const limit = parseInt(url.searchParams.get('limit') || '50');
		const verified = url.searchParams.get('verified');
		const isOG = url.searchParams.get('isOG');

		const where: any = {};
		if (verified !== null) where.verified = verified === 'true';
		if (isOG !== null) where.isOG = isOG === 'true';

		const [entries, total] = await Promise.all([
			prisma.waitlistEntry.findMany({
				where,
				orderBy: { createdAt: 'desc' },
				skip: (page - 1) * limit,
				take: limit,
				select: {
					id: true,
					email: true,
					name: true,
					phone: true,
					isOG: true,
					verified: true,
					source: true,
					createdAt: true,
					updatedAt: true
				}
			}),
			prisma.waitlistEntry.count({ where })
		]);

		return json({
			entries,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		});
	} catch (error) {
		console.error('Error fetching waitlist:', error);
		return json(
			{ error: 'Failed to fetch waitlist entries' },
			{ status: 500 }
		);
	}
};
