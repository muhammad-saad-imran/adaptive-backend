import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({ default: 'Saad' })
  @IsString()
  firstName: string;

  @ApiProperty({ default: 'Imran' })
  @IsString()
  lastName: string;

  @ApiProperty({ default: 'saad@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsString()
  password: string;
}
