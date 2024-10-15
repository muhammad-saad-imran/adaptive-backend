import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
  PrimaryKey,
  Model,
  HasOne,
  NotNull,
} from 'sequelize-typescript';
import { Quote } from 'src/insurance/quote/quote.entity';

@Table({ tableName: 'insureds' })
export class Insured extends Model<
  InferAttributes<Insured>,
  InferCreationAttributes<Insured, { omit: 'id' | 'created_at' | 'updated_at' }>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  businessName: string;

  @Column(DataType.STRING)
  contactName: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  phoneNumber: string;

  @CreatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @HasOne(() => Quote)
  quote: Quote;
}
