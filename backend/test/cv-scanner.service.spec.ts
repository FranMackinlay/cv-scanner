import { Test, TestingModule } from '@nestjs/testing';
import { CvScannerService } from './cv-scanner.service';

describe('CvScannerService', () => {
  let service: CvScannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvScannerService],
    }).compile();

    service = module.get<CvScannerService>(CvScannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
