import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { env } from '$env/dynamic/private';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const connectionString = env.DATABASE_URL;

if (!connectionString) {
	throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
	global.prisma ||
	new PrismaClient({
		adapter,
		log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
	});

if (env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}
