import pdfParse from 'pdf-parse';
import fs from 'fs';

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    console.error('Error parsing PDF HERE:', error);
    throw new Error('Invalid PDF structure');
  }
}
