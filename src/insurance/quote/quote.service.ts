import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuoteDto } from 'src/insurance/dtos/create-quote.dto';
import { Insured } from 'src/insurance/insured/insured.entity';
import { InsuredService } from 'src/insurance/insured/insured.service';
import { Quote } from 'src/insurance/quote/quote.entity';
import {
  Address,
  BusinessInformation,
  Coverage,
  QuoteState,
  Step,
} from 'src/insurance/types';
import { formatDate, getDate } from 'src/utils/datetime.utils';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote) private quoteModel: typeof Quote,
    @InjectModel(Insured) private insuredModel: typeof Insured,
    private insuredService: InsuredService,
  ) {}

  async findOne(id: string) {
    return this.quoteModel.findByPk(id, { include: [this.insuredModel] });
  }

  async processQuote(createDto: CreateQuoteDto) {
    switch (createDto.step) {
      case Step.Address:
        return this.createQuote(createDto);
      case Step.Coverage:
        return this.addCoverage(createDto.quoteId, createDto.coverage);
      case Step.BusinessInformation:
        return this.addBusinessInformation(
          createDto.quoteId,
          createDto.businessInformation,
        );
      case Step.Checkout:
        return this.checkout(createDto.quoteId);
      default:
        throw new BadRequestException(
          'Step can only be Address, Coverage, BusinessInformation or Checkout',
        );
    }
  }

  async createQuote(newQuote: CreateQuoteDto) {
    const date = getDate();
    const utc = new Date(formatDate(date));
    return this.quoteModel.create({
      status: QuoteState.Draft,
      quote_date: formatDate(date, 'MM/DD/YYYY'),
      quote_date_utc: utc,
      street: newQuote.address.street,
      city: newQuote.address.city,
      state: newQuote.address.state,
      zip_code: newQuote.address.zipCode,
      product: newQuote.product,
    });
  }

  async addCoverage(quoteId: string, coverage: Coverage) {
    console.log({ coverage });
    return this.findOne(quoteId);
  }

  async addBusinessInformation(
    quoteId: string,
    businessInformation: BusinessInformation,
  ) {
    const newInsured = await this.insuredService.create(businessInformation);
    await this.quoteModel.update(
      { insured_id: newInsured.id },
      { where: { id: quoteId } },
    );
    return this.findOne(quoteId);
  }

  async checkout(quoteId: string) {
    const date = getDate();
    const utc = new Date(formatDate(date));
    await this.quoteModel.update(
      {
        bound: true,
        bound_date: formatDate(date, 'MM/DD/YYYY'),
        bound_date_utc: utc,
        status: QuoteState.Pending,
      },
      { where: { id: quoteId } },
    );
    return this.findOne(quoteId);
  }
}
