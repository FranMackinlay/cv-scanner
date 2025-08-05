import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvScannerModule } from './cv-scanner/cv-scanner.module';

@Module({
  imports: [CvScannerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
