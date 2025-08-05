import * as dotenv from 'dotenv';
import  OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

dotenv.config();

const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;

if (!OPENROUTER_API_URL) {
  console.error('OPENROUTER_API_URL is not defined in the environment variables.');
  process.exit(1);
}

const openai = new OpenAI({
  baseURL: OPENROUTER_API_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});


const OUTPUT_DIR = path.join(__dirname, '../data/generated-cvs');


if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const roles = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'Marketing Specialist',
  'DevOps Engineer',
  'AI Researcher',
  'Business Analyst',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'Marketing Specialist',
  'DevOps Engineer',
  'AI Researcher',
  'Business Analyst',
  'Frontend Developer',
  'Backend Developer',
  'DevOps Engineer',
  'AI Researcher',
  'Business Analyst',
  'Frontend Developer',
  'Backend Developer',
];

async function generateCVContent(role: string): Promise<string> {
  const prompt = `Generate a CV for a ${role}. Include sections for Name, Contact Information, Professional Summary, Work Experience, Skills, and Education. Generate different content in all of the Cv's for each section with relevant details for a professional in this role. For the contact details, choose a random name from a random country. Don't repeat content. Don't leave any section empty.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'meta-llama/llama-3-8b-instruct',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates professional CVs.' },
        { role: 'user', content: prompt },
      ],
    });

    return response.choices[0].message.content || 'No content returned.';
  } catch (error) {
    console.error(`Error generating CV for role "${role}":`, error);
    throw error;
  }
}

async function saveCVAsPDF(content: string, fileName: string) {
  try {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 600;
    const pageHeight = 800;
    const margin = 50;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let fontSize = 12;
    const lineHeight = fontSize * 1.5;
    const maxLineWidth = pageWidth - margin * 2;

    const sectionHeaders = [
      'Contact Information',
      'Professional Summary',
      'Work Experience',
      'Skills',
      'Education',
    ];

    const sectionRegex = new RegExp(`(${sectionHeaders.join('|')})`, 'g');
    const parts = content.split(sectionRegex).filter(part => part.trim() !== '');

    const structuredSections: { header: string; body: string }[] = [];
    for (let i = 0; i < parts.length; i++) {
      if (sectionHeaders.includes(parts[i])) {
        structuredSections.push({
          header: parts[i],
          body: parts[i + 1]?.trim() || '',
        });
        i++;
      }
    }

    const lines: { text: string; bold?: boolean }[] = [];

    for (const section of structuredSections) {
      lines.push({ text: section.header.toUpperCase(), bold: true });
      lines.push({ text: '' });

      const words = section.body.split(/\s+/);
      let line = '';
      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width > maxLineWidth) {
          lines.push({ text: line });
          line = word;
        } else {
          line = testLine;
        }
      }
      if (line) lines.push({ text: line });

      lines.push({ text: '' });
    }

    const maxLines = Math.floor((pageHeight - margin * 2) / lineHeight);
    while (lines.length > maxLines && fontSize > 6) {
      fontSize -= 1;
    }

    if (lines.length > maxLines) {
      lines.splice(maxLines - 1);
      lines.push({ text: '... (truncated)' });
    }

    let y = pageHeight - margin;
    for (const line of lines) {
      const usedFont = line.bold ? fontBold : font;
      page.drawText(line.text, {
        x: margin,
        y,
        size: fontSize,
        font: usedFont,
        color: line.bold ? rgb(0, 0, 0.5) : rgb(0, 0, 0),
      });
      y -= lineHeight;
    }

    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync(path.join(OUTPUT_DIR, fileName), pdfBytes);

    console.log(`Saved CV as PDF: ${fileName}`);
  } catch (error) {
    console.error(`Error saving CV as PDF:`, error);
    throw error;
  }
}

async function generateCVs() {
  console.log('Starting CV generation...');
  for (const role of roles) {
    try {
      console.log(`Generating CV for role: ${role}`);
      const content = await generateCVContent(role);
      const fileName = `${role.replace(/\s+/g, '_')}_CV-${Date.now()}.pdf`;
      await saveCVAsPDF(content.replace(/[^\x00-\x7F]/g, ''), fileName);
    } catch (error) {
      console.error(`Failed to generate CV for role "${role}":`, error);
    }
  }
  console.log('CV generation complete!');
}

generateCVs().catch((error) => {
  console.error('Error during CV generation:', error);
  process.exit(1);
});
