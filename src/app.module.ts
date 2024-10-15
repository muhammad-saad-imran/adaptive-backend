import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './insurance/quote/quote.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';
import { UserController } from './core/user/user.controller';

@Module({
  imports: [
    QuoteModule,
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
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
