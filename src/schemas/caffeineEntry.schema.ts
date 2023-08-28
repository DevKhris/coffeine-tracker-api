import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CaffeineEntryDocument = HydratedDocument<CaffeineEntry>;

@Schema({
  timestamps: true,
})
export class CaffeineEntry {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  date: Date;

  @Prop({
    required: true,
    trim: true,
  })
  time: Date;

  @Prop({
    required: true,
    trim: true,
  })
  @Prop()
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  @Prop()
  amount: number;
}

export const CaffeineEntrySchema = SchemaFactory.createForClass(CaffeineEntry);
