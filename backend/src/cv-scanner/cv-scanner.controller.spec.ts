import { Test, TestingModule } from '@nestjs/testing';
import { CvScannerController } from './cv-scanner.controller';

describe('CvScannerController', () => {
  let controller: CvScannerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvScannerController],
    }).compile();

    controller = module.get<CvScannerController>(CvScannerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
