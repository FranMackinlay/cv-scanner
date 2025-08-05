import { Injectable } from '@nestjs/common';
import { askLLM } from 'src/utils/llm-integration';
import { extractTextFromPDF } from 'src/utils/pdf-parser';
import { storeInVectorDB, queryVectorDB } from 'src/utils/vector-db';

@Injectable()
export class CVScannerService {
  async processCV(filePath: string, id: string): Promise<void> {
    const text = await extractTextFromPDF(filePath);
    try {
      await storeInVectorDB(id, text);
    } catch (error) {
      console.error('Error storing in vector DB:', error.message);
    }
  }

  async answerQuestion(question: string): Promise<string> {
    const relevantTexts = await queryVectorDB(question);
    const context = relevantTexts.join('\n');
    return await askLLM(question, context);
  }
}
