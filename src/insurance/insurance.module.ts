import { Module } from '@nestjs/common';
import { InsuredModule } from 'src/insurance/insured/insured.module';
import { QuoteModule } from 'src/insurance/quote/quote.module';

@Module({
  imports: [InsuredModule, QuoteModule],
})
export class InsuranceModule {}
