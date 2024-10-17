import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { LoginDto, SignupDto } from 'src/auth/dtos';
import { User } from 'src/auth/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async signup(userData: SignupDto) {
    const user = await this.findUser(userData.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
    const {
      dataValues: { id, password, updatedAt, ...result },
    } = await this.userModel.create(userData);
    return result;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.findUser(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (await bcrypt.compare(password, user.dataValues.password)) {
      return {
        access_token: this.jwtService.sign({ id: user.dataValues.id }),
      };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async verify(token: string) {
    const decoded = this.jwtService.verify<{ id: string }>(token);
    return this.userModel.findByPk(decoded.id);
  }
}
