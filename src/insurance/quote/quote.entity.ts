import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Table,
  Column,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  BelongsTo,
  NotNull,
} from 'sequelize-typescript';
import { Insured } from 'src/insurance/insured/insured.entity';
import { Product, QuoteState, StateName } from 'src/insurance/types';

@Table({ tableName: 'quotes' })
export class Quote extends Model<
  InferAttributes<Quote>,
  InferCreationAttributes<
    Quote,
    { omit: 'id' | 'created_at' | 'updated_at' | 'deleted_at' }
  >
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.ENUM(...Object.values(QuoteState)))
  status: QuoteState;

  @Column(DataType.STRING)
  quote_date: string;

  @Column(DataType.DATE)
  quote_date_utc: Date;

  @Column(DataType.STRING)
  street?: string;

  @Column(DataType.STRING)
  street2?: string;

  @Column(DataType.STRING)
  city?: string;

  @Column(DataType.ENUM(...Object.values(StateName)))
  state?: StateName;

  @Column(DataType.STRING)
  zip_code: string;

  @Column(DataType.STRING)
  effective_date?: string;

  @Column(DataType.DATE)
  effective_date_utc?: Date;

  @Column(DataType.STRING)
  bound_date?: string;

  @Column(DataType.DATE)
  bound_date_utc?: Date;

  @ForeignKey(() => Insured)
  @Column(DataType.UUID)
  insured_id: string;

  @Column(DataType.BOOLEAN)
  bound: boolean;

  @Column(DataType.NUMBER)
  quote_number_inc?: number;

  @Column(DataType.STRING)
  quote_number?: string;

  @Column(DataType.STRING)
  carrier?: string;

  @Column(DataType.JSONB)
  meta_data: object;

  @Column(DataType.JSONB)
  documents: object;

  @Column(DataType.JSONB)
  data: object;

  @Column(DataType.ENUM(...Object.values(Product)))
  product: Product;

  @CreatedAt
  @Column(DataType.DATE)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deleted_at?: Date;

  @BelongsTo(() => Insured)
  insured: Insured;
}
