import * as XLSX from 'xlsx';

export class ExcelUtils {

    static getTestData(filePath: string, sheetName: string): any[] {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        return data.filter((row: any) => row.Run?.toString().toLowerCase() === 'y');
    }

    static writeToExcel(filePath: string, sheetName: string, data: any[]): void {
        const workbook = XLSX.readFile(filePath);
        const worksheet = XLSX.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = worksheet;
        XLSX.writeFile(workbook, filePath);
    }
}