import { Module } from '@nestjs/common';
import { CVScannerService } from './cv-scanner.service';
import { CVScannerController } from './cv-scanner.controller';

@Module({
  providers: [CVScannerService],
  controllers: [CVScannerController]
})
export class CvScannerModule {}
