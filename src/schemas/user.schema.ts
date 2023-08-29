import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id?: mongoose.Types.ObjectId;

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

  @Prop({
    required: true,
    trim: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
