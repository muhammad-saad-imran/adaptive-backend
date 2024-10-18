import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quote } from 'src/insurance/quote/quote.entity';
import { Insured } from 'src/insurance/insured/insured.entity';
import { InsuranceModule } from './insurance/insurance.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { LoggingIntercptor } from 'src/interceptors/logging.interceptor';

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
          logging: false,
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingIntercptor,
    },
  ],
})
export class AppModule {}
