import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Neon connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({ adapter });

async function importWaitlist() {
	try {
		console.log('Starting waitlist import from Excel...');

		// Read the Excel file
		const filePath = join(__dirname, '../src/data/skillkenya_waitlist.xlsx');
		const workbook = xlsx.readFile(filePath);
		const sheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[sheetName];
		const data = xlsx.utils.sheet_to_json(worksheet);

		console.log(`Found ${data.length} entries in Excel file`);

		let imported = 0;
		let skipped = 0;
		let updated = 0;

		for (const row of data) {
			try {
				// Extract email from the row (adjust column names as needed)
				const email = row.Email || row.email || row.EMAIL;
				const name = row.Name || row.name || row.NAME;
				const phone = row.Phone || row.phone || row.PHONE;

				if (!email) {
					console.warn('Skipping row without email:', row);
					skipped++;
					continue;
				}

				// Check if entry already exists
				const existing = await prisma.waitlistEntry.findUnique({
					where: { email: email.toLowerCase().trim() }
				});

				if (existing) {
					// Update existing entry to mark as OG
					await prisma.waitlistEntry.update({
						where: { email: email.toLowerCase().trim() },
						data: {
							isOG: true,
							name: name || existing.name,
							phone: phone || existing.phone,
							verified: true
						}
					});
					updated++;
					console.log(`Updated existing entry: ${email}`);
				} else {
					// Create new entry
					await prisma.waitlistEntry.create({
						data: {
							email: email.toLowerCase().trim(),
							name: name?.trim() || null,
							phone: phone?.trim() || null,
							isOG: true,
							verified: true,
							source: 'excel_import'
						}
					});
					imported++;
					console.log(`Imported new entry: ${email}`);
				}
			} catch (error) {
				console.error('Error processing row:', row, error.message);
				skipped++;
			}
		}

		console.log('\n=== Import Summary ===');
		console.log(`Total rows processed: ${data.length}`);
		console.log(`New entries imported: ${imported}`);
		console.log(`Existing entries updated: ${updated}`);
		console.log(`Skipped: ${skipped}`);
		console.log('======================\n');

		// Display some stats
		const stats = await prisma.waitlistEntry.aggregate({
			_count: true,
			where: { isOG: true }
		});
		console.log(`Total OG users in database: ${stats._count}`);

	} catch (error) {
		console.error('Error importing waitlist:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

// Run the import
importWaitlist()
	.then(() => {
		console.log('Import completed successfully!');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Import failed:', error);
		process.exit(1);
	});
