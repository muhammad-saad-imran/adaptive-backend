import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from 'src/api/routes/insurance/quote.controller';

describe('InsuranceController', () => {
  let controller: QuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
