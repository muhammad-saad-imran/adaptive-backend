import { Module } from '@nestjs/common';
import { InsuredService } from './insured.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Insured } from 'src/insurance/insured/insured.entity';

@Module({
  providers: [InsuredService],
  exports: [InsuredService],
  imports: [SequelizeModule.forFeature([Insured])],
})
export class InsuredModule {}
