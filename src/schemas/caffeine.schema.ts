import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Caffeine {
  _id?: Types.ObjectId;

  @Prop({
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

  user?: [{ type: Types.ObjectId; ref: 'User' }];
}

export type CaffeineDocument = HydratedDocument<Caffeine>;

export const CaffeineSchema = SchemaFactory.createForClass(Caffeine);
