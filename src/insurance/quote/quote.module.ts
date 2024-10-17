import { Module } from '@nestjs/common';
import { QuoteController } from '../../api/routes/insurance/quote.controller';
import { QuoteService } from './quote.service';
import { InsuredModule } from '../insured/insured.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';
import { BullModule } from '@nestjs/bullmq';
import { QUOTES_QUEUE } from 'src/constants';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  imports: [
    InsuredModule,
    SequelizeModule.forFeature([Quote, Insured]),
    BullModule.registerQueue({ name: QUOTES_QUEUE }),
  ],
})
export class QuoteModule {}
