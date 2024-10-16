import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDecimal,
  IsEmail,
  IsEnum,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum StateName {
  Alabama = 'Alabama',
  Alaska = 'Alaska',
  Arizona = 'Arizona',
  Arkansas = 'Arkansas',
  California = 'California',
  Colorado = 'Colorado',
  Connecticut = 'Connecticut',
  Delaware = 'Delaware',
  Florida = 'Florida',
  Georgia = 'Georgia',
  Hawaii = 'Hawaii',
  Idaho = 'Idaho',
  Illinois = 'Illinois',
  Indiana = 'Indiana',
  Iowa = 'Iowa',
  Kansas = 'Kansas',
  Kentucky = 'Kentucky',
  Louisiana = 'Louisiana',
  Maine = 'Maine',
  Maryland = 'Maryland',
  Massachusetts = 'Massachusetts',
  Michigan = 'Michigan',
  Minnesota = 'Minnesota',
  Mississippi = 'Mississippi',
  Missouri = 'Missouri',
  Montana = 'Montana',
  Nebraska = 'Nebraska',
  Nevada = 'Nevada',
  NewHampshire = 'NewHampshire',
  NewJersey = 'NewJersey',
  NewMexico = 'NewMexico',
  NewYork = 'NewYork',
  NorthCarolina = 'NorthCarolina',
  NorthDakota = 'NorthDakota',
  Ohio = 'Ohio',
  Oklahoma = 'Oklahoma',
  Oregon = 'Oregon',
  Pennsylvania = 'Pennsylvania',
  RhodeIsland = 'RhodeIsland',
  SouthCarolina = 'SouthCarolina',
  SouthDakota = 'SouthDakota',
  Tennessee = 'Tennessee',
  Texas = 'Texas',
  Utah = 'Utah',
  Vermont = 'Vermont',
  Virginia = 'Virginia',
  Washington = 'Washington',
  WestVirginia = 'WestVirginia',
  Wisconsin = 'Wisconsin',
  Wyoming = 'Wyoming',
}

export enum QuoteState {
  Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum Product {
  Outage = 'outage',
}

export enum Step {
  Address = 'address',
  Coverage = 'coverage',
  BusinessInformation = 'businessInformation',
  Checkout = 'checkout',
}

export class Address {
  @ApiProperty({ default: 'OH street 2215 West 125th Street LLC' })
  @IsString()
  street: string;

  @ApiProperty({ default: 'New York' })
  @IsString()
  city: string;

  @ApiProperty({ default: StateName.NewYork })
  @IsEnum(StateName)
  state: StateName;

  @ApiProperty({ default: '85261' })
  @IsString()
  zipCode: string;
}

export class Coverage {
  @ApiProperty({ default: '100000' })
  @IsDecimal()
  CoverageAmount: number;

  @ApiProperty({ default: '8' })
  @IsNumber()
  CoverageHours: number;

  @ApiProperty({ default: '2025-1-1' })
  @IsDate()
  @Type(() => Date)
  effectiveDate: Date;
}

export class BusinessInformation {
  @ApiProperty({ default: 'Manufacturing' })
  @IsString()
  businessName: string;

  @ApiProperty({ default: 'James Robin' })
  @IsString()
  contactName: string;

  @ApiProperty({ default: 'business.1728794430@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '12133734253' })
  @IsPhoneNumber('US')
  phoneNumber: string;
}

export type QuoteMetaData = {
  step: {
    [value in Step]: boolean;
  };
};

export type QuoteData = {
  coverage?: {
    amount: number;
    duration: number;
    effectiveDate: string;
    effectiveDateUtc: Date;
    premium: number;
  };
  businessInformation?: BusinessInformation;
};
