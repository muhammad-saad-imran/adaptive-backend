import { Module } from '@nestjs/common';
import { QuoteController } from '../../api/routes/insurance/quote.controller';
import { QuoteService } from './quote.service';
import { InsuredModule } from '../insured/insured.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [
    InsuredModule,
    SequelizeModule.forFeature([Quote]),
    SequelizeModule.forFeature([Insured]),
  ],
})
export class QuoteModule {}
