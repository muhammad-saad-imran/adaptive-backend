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
    if (value.step === Step.Address) {
      return value;
    }

    const quote = await this.quoteService.findOne(value.quoteId);
    const meta_data = quote.dataValues.meta_data.step;
    const parsingError = new BadRequestException(
      'Complete all previous steps. Steps: address, coverage, businessInformation and checkout',
    );

    switch (value.step) {
      case Step.Coverage: {
        if (meta_data[Step.Address]) {
          return value;
        } else {
          throw parsingError;
        }
      }
      case Step.BusinessInformation: {
        if (meta_data[Step.Coverage]) {
          return value;
        } else {
          throw parsingError;
        }
      }
      case Step.Checkout: {
        if (meta_data[Step.BusinessInformation]) {
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
