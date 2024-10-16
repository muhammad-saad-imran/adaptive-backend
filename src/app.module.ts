import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';
import { InsuranceModule } from './insurance/insurance.module';

@Module({
  imports: [
    InsuranceModule,
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          uri: configService.getOrThrow('DATABASE_URI'),
          models: [Quote, Insured],
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
