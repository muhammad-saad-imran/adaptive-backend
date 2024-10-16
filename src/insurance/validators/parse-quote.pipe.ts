import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateQuoteDto } from 'src/insurance/dtos/create-quote.dto';
import { QuoteService } from 'src/insurance/quote/quote.service';
import { Step } from 'src/insurance/types';

@Injectable()
export class ParseQuotePipe implements PipeTransform {
  constructor(private quoteService: QuoteService) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || typeof metatype !== typeof CreateQuoteDto) {
      throw new BadRequestException('Invalid quotes data');
    }

    const quote = await this.quoteService.findOne(value.quoteId);
    const is_step_completed = quote.dataValues.meta_data.step;
    const parsingError = new BadRequestException(
      'Complete all previous steps. Steps: address, coverage, businessInformation and checkout',
    );

    switch (value.step) {
      case Step.Address:
        return value;
      case Step.Coverage: {
        if (is_step_completed[Step.Address]) {
          return value;
        } else {
          throw parsingError;
        }
      }
      case Step.BusinessInformation: {
        if (is_step_completed[Step.Coverage]) {
          return value;
        } else {
          throw parsingError;
        }
      }
      case Step.Checkout: {
        if (is_step_completed[Step.BusinessInformation]) {
          return value;
        } else {
          throw parsingError;
        }
      }
      default:
        throw new BadRequestException(
          'Invalid step. Use address, coverage, businessInformation or checkout ',
        );
    }
  }
}
