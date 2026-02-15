import { prisma } from '$lib/server/prisma';
import { createHash } from 'node:crypto';
import type { PageServerLoad } from './$types';

// Simple in-memory cache for Gravatar checks (expires on server restart)
const gravatarCache = new Map<string, boolean>();

/**
 * Check if a Gravatar exists for the given email
 * Uses HEAD request to avoid downloading the image
 */
async function hasGravatar(email: string): Promise<boolean> {
	const emailHash = createHash('md5').update(email.toLowerCase().trim()).digest('hex');

	// Check cache first
	if (gravatarCache.has(emailHash)) {
		return gravatarCache.get(emailHash)!;
	}

	try {
		// Use HEAD request to check if Gravatar exists without downloading
		const response = await fetch(
			`https://www.gravatar.com/avatar/${emailHash}?s=100&d=404`,
			{
				method: 'HEAD',
				signal: AbortSignal.timeout(2000) // 2 second timeout
			}
		);

		const exists = response.status === 200;
		gravatarCache.set(emailHash, exists);
		return exists;
	} catch (error) {
		// On error, assume no Gravatar
		gravatarCache.set(emailHash, false);
		return false;
	}
}

export const load: PageServerLoad = async () => {
	// Fetch recent waitlist entries
	const entries = await prisma.waitlistEntry.findMany({
		orderBy: { createdAt: 'desc' },
		take: 100,
		select: {
			id: true,
			name: true,
			email: true,
			isOG: true
		}
	});

	// Check Gravatars in parallel
	const gravatarChecks = await Promise.allSettled(
		entries.map(entry => entry.email ? hasGravatar(entry.email) : Promise.resolve(false))
	);

	// Transform data for frontend
	const users = entries.map((entry, index) => {
		// Create a truly unique seed for each user using their database ID
		const uniqueSeed = entry.email?.toLowerCase().trim() || entry.id;

		// Generate unique Dicebear URL
		const dicebearUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(uniqueSeed)}&backgroundColor=transparent`;

		let avatar = dicebearUrl; // Default to Dicebear

		// Check if Gravatar exists
		const gravatarCheckResult = gravatarChecks[index];
		if (entry.email && gravatarCheckResult.status === 'fulfilled' && gravatarCheckResult.value) {
			// Gravatar exists, use it
			const emailHash = createHash('md5').update(entry.email.toLowerCase().trim()).digest('hex');
			avatar = `https://www.gravatar.com/avatar/${emailHash}?s=100`;
		}

		return {
			id: entry.id,
			name: entry.name || 'Anonymous',
			handle: entry.name ? entry.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '') : `user${index}`,
			isOG: entry.isOG,
			avatar
		};
	});

	console.log(`Loaded ${users.length} users, ${gravatarCache.size} Gravatars checked`);

	return {
		users
	};
};
