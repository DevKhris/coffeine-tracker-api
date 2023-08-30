import { Field, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
  timestamps: true,
})
export class User {
  @Field(() => String)
  _id?: ObjectId;

  @Field(() => String)
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  username: string;

  @Field(() => String)
  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Field(() => String)
  @Prop({
    required: true,
    trim: true,
  })
  email: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
