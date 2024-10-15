import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from 'src/insurance/quote/quote.service';

describe('InsuranceService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
