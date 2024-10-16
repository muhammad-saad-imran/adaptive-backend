import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateQuoteDto } from 'src/insurance/dtos/create-quote.dto';
import { QuoteService } from 'src/insurance/quote/quote.service';
import { ParseQuotePipe } from 'src/insurance/validators/parse-quote.pipe';

@ApiTags('Quote')
@Controller('insurance')
export class QuoteController {
  constructor(private insuranceService: QuoteService) {}

  @ApiParam({ name: 'id' })
  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return this.insuranceService.findOne(id);
  }

  @ApiBody({ type: CreateQuoteDto })
  @Post()
  async create(
    @Body(ValidationPipe, ParseQuotePipe) createInsuranceDto: CreateQuoteDto,
  ) {
    return this.insuranceService.processQuote(createInsuranceDto);
  }
}
