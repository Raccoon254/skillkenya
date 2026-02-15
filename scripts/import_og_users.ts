import 'dotenv/config'; 
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import XLSX from 'xlsx';
import path from 'path';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const { readFile, utils } = XLSX;

async function main() {
    const filePath = path.join(process.cwd(), 'src/data/skillkenya_waitlist.xlsx');
    console.log(`Reading file from: ${filePath}`);

    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet);

    console.log(`Found ${data.length} records.`);

    let importedCount = 0;
    let errorCount = 0;

    for (const record of data as any[]) {
        const email = record['Email']?.trim() || record['email']?.trim(); // Check both cases

        if (!email) {
            // console.warn('Skipping record with missing email:', record);
            continue;
        }

        // Derive name from email if not present
        const nameFallback = email.split('@')[0];
        const name = record['Name']?.trim() || record['First Name']?.trim() || nameFallback;

        try {
            await prisma.waitlistEntry.upsert({
                where: { email },
                update: {
                    isOG: true,
                    verified: true 
                },
                create: {
                    email,
                    name: name,
                    isOG: true,
                    verified: true,
                    source: 'excel_import'
                }
            });
            process.stdout.write('.');
            importedCount++;
        } catch (error) {
            console.error(`\nFailed to import ${email}:`, error);
            errorCount++;
        }
    }

    console.log(`\nImport completed.`);
    console.log(`Imported/Updated: ${importedCount}`);
    console.log(`Errors: ${errorCount}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
