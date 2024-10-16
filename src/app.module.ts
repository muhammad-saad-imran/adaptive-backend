import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './insurance/quote/quote.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';
import { InsuredModule } from 'src/insurance/insured/insured.module';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
