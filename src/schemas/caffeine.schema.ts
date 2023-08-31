import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({
  timestamps: true,
})
export class Caffeine {
  @Field(() => String)
  _id?: Types.ObjectId;

  @Field(() => Date)
  @Prop({
    trim: true,
  })
  date: Date;

  @Field(() => Date)
  @Prop({
    required: true,
    trim: true,
  })
  time: Date;

  @Field(() => String)
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Field(() => Number)
  @Prop({
    required: true,
    trim: true,
  })
  amount: number;

  @Field(() => [User])
  user?: [{ type: Types.ObjectId; ref: 'User' }];
}

export type CaffeineDocument = HydratedDocument<Caffeine>;

export const CaffeineSchema = SchemaFactory.createForClass(Caffeine);
