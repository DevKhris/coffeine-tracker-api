import { Field, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field(() => String)
  _id?: Types.ObjectId;

  @Field(() => String)
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Field(() => String)
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  email: string;

  caffeines?: [type: Types.ObjectId, ref: 'Caffeine'];
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
