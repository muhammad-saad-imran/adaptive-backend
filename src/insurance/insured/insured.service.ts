import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';
import { Insured } from 'src/insurance/insured/insured.entity';

@Injectable()
export class InsuredService {
  constructor(@InjectModel(Insured) private insuredModel: typeof Insured) {}

  async findOne(id: string) {
    return this.insuredModel.findByPk(id);
  }

  async create(newInsured: CreationAttributes<Insured>) {
    return this.insuredModel.create(newInsured);
  }
}
