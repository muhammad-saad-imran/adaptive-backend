import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsUUID, IsOptional } from 'class-validator';
import {
  Address,
  BusinessInformation,
  Coverage,
  Product,
  Step,
} from 'src/insurance/types';

export class CreateQuoteDto {
  @ApiPropertyOptional({ default: 'cdbbfd5a-07aa-484b-98cc-28e1c9854b45' })
  @IsUUID()
  @IsOptional()
  quoteId?: string;

  @ApiProperty({ default: 'outage' })
  @IsEnum(Product)
  product: Product;

  @ApiProperty({ default: 'address' })
  @IsEnum(Step)
  step: Step;

  @ApiPropertyOptional()
  @IsOptional()
  address?: Address;

  @ApiPropertyOptional()
  @IsOptional()
  coverage?: Coverage;

  @ApiPropertyOptional()
  @IsOptional()
  businessInformation?: BusinessInformation;

  @ApiPropertyOptional({ default: {} })
  @IsOptional()
  checkout?: {};
}
