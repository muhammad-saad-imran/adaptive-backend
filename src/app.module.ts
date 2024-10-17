import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';
import { InsuranceModule } from './insurance/insurance.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    AuthModule,
    InsuranceModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          uri: configService.getOrThrow('DATABASE_URI'),
          models: [Quote, Insured, User],
        };
      },
    }),
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {}
