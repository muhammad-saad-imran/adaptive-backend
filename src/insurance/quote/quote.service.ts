import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuoteDto } from 'src/insurance/dtos/create-quote.dto';
import { Insured } from 'src/insurance/insured/insured.entity';
import { InsuredService } from 'src/insurance/insured/insured.service';
import { Quote } from 'src/insurance/quote/quote.entity';
import {
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

  async processQuote(quoteData: CreateQuoteDto) {
    switch (quoteData.step) {
      case Step.Address:
        return this.createQuote(quoteData);
      case Step.Coverage:
        return this.addCoverage(quoteData.quoteId, quoteData.coverage);
      case Step.BusinessInformation:
        return this.addBusinessInformation(
          quoteData.quoteId,
          quoteData.businessInformation,
        );
      case Step.Checkout:
        return this.checkout(quoteData.quoteId);
      default:
        throw new BadRequestException(
          'Step can only be Address, Coverage, BusinessInformation or Checkout',
        );
    }
  }

  async createQuote(quoteData: CreateQuoteDto) {
    const date = getDate();
    const step: any = {};
    Object.values(Step).map((item) => (step[item] = false));
    step[Step.Address] = true;

    return this.quoteModel.create({
      status: QuoteState.Draft,
      quote_date: formatDate(date, 'MM/DD/YYYY'),
      quote_date_utc: date.toDate(),
      street: quoteData.address.street,
      city: quoteData.address.city,
      state: quoteData.address.state,
      zip_code: quoteData.address.zipCode,
      product: quoteData.product,
      meta_data: {
        step,
      },
    });
  }

  async addCoverage(quoteId: string, coverage: Coverage) {
    let quote = await this.findOne(quoteId);
    await this.quoteModel.update(
      {
        meta_data: {
          ...quote.meta_data,
          step: { ...quote.meta_data.step, coverage: true },
        },
        data: {
          ...quote.data,
          coverage: {
            amount: coverage.CoverageAmount,
            duration: coverage.CoverageHours,
            effectiveDate: formatDate(coverage.effectiveDate, 'MM/DD/YYYY'),
            effectiveDateUtc: coverage.effectiveDate,
            premium: coverage.CoverageAmount * coverage.CoverageHours,
          },
        },
      },
      { where: { id: quoteId } },
    );
    return this.findOne(quoteId);
  }

  async addBusinessInformation(
    quoteId: string,
    businessInformation: BusinessInformation,
  ) {
    const newInsured = await this.insuredService.create(businessInformation);
    const quote = await this.findOne(quoteId);
    await this.quoteModel.update(
      {
        meta_data: {
          ...quote.meta_data,
          step: { ...quote.meta_data.step, businessInformation: true },
        },
        insured_id: newInsured.id,
      },
      { where: { id: quoteId } },
    );
    return this.findOne(quoteId);
  }

  async checkout(quoteId: string) {
    const date = getDate();
    const quote = await this.findOne(quoteId);
    await this.quoteModel.update(
      {
        bound: true,
        bound_date: formatDate(date, 'MM/DD/YYYY'),
        bound_date_utc: date.toDate(),
        status: QuoteState.Pending,
        meta_data: {
          ...quote.meta_data,
          step: { ...quote.meta_data.step, checkout: true },
        },
      },
      { where: { id: quoteId } },
    );
    return this.findOne(quoteId);
  }
}
