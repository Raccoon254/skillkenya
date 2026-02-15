import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

// GET /api/waitlist/stats - Get waitlist statistics
export const GET: RequestHandler = async () => {
	try {
		const [total, verified, ogCount, recent] = await Promise.all([
			prisma.waitlistEntry.count(),
			prisma.waitlistEntry.count({ where: { verified: true } }),
			prisma.waitlistEntry.count({ where: { isOG: true } }),
			prisma.waitlistEntry.count({
				where: {
					createdAt: {
						gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
					}
				}
			})
		]);

		return json({
			total,
			verified,
			ogCount,
			recentWeek: recent,
			pending: total - verified
		});
	} catch (error) {
		console.error('Error fetching waitlist stats:', error);
		return json(
			{ error: 'Failed to fetch waitlist statistics' },
			{ status: 500 }
		);
	}
};
