import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/auth/user.entity';
import { AuthController } from 'src/api/routes/auth.controller';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.getOrThrow('JWT_SECRET'),
          signOptions: { expiresIn: '48h' },
        };
      },
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
