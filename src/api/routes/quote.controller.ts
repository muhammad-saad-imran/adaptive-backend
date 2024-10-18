import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateQuoteDto } from 'src/insurance/dtos/create-quote.dto';
import { QuoteService } from 'src/insurance/quote/quote.service';
import { ParseQuotePipe } from 'src/insurance/validators/parse-quote.pipe';

@ApiTags('Quote')
@ApiBearerAuth()
@Controller('insurance')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @ApiParam({ name: 'id' })
  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.quoteService.findOne(id);
  }

  @ApiBody({ type: CreateQuoteDto })
  @Post()
  async create(
    @Body(ValidationPipe, ParseQuotePipe) createInsuranceDto: CreateQuoteDto,
  ) {
    return this.quoteService.processQuote(createInsuranceDto);
  }
}
