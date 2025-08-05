import { Controller, Post, Body, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CVScannerService } from './cv-scanner.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

@Controller('cv-scanner')
export class CVScannerController {
  constructor(private readonly cvScannerService: CVScannerService) { }

  @Post('process')
  @UseInterceptors(
    FilesInterceptor('files', 30, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now();
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return callback(
            new BadRequestException('Only PDF files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async processCVs(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files?.length) throw new BadRequestException('No files uploaded');

    const results: { file: string; message: string }[] = [];

    for (const file of files) {
      try {

        const pdfBytes = fs.readFileSync(file.path);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        const id = file.originalname.split('.')[0];
        await this.cvScannerService.processCV(file.path, id);

        results.push({
          file: file.originalname,
          message: 'CV processed successfully',
        });
      } catch (error) {
        console.error(`Error validating PDF (${file.originalname}):`, error.message);
        results.push({
          file: file.originalname,
          message: 'Invalid PDF structure',
        });
      }
    }

    return results;
  }

  @Post('ask')
  async askQuestion(@Body('question') question: string) {
    const answer = await this.cvScannerService.answerQuestion(question);
    return { answer };
  }
}
