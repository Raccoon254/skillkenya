//@ts-ignore
import XLSX from 'xlsx';
//@ts-ignore
import path from 'path';

const { readFile, utils } = XLSX;
const filePath = path.join(process.cwd(), 'src/data/skillkenya_waitlist.xlsx');
const workbook = readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = utils.sheet_to_json(worksheet, { header: 1 });

console.log('Headers:', data[0]);
console.log('First Row:', data[1]);
