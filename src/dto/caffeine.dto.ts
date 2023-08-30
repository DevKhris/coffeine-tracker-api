import { User } from 'src/schemas/user.schema';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';
import { Schema, Types } from 'mongoose';

export class CaffeineDTO {
  _id?: Types.ObjectId;
  date?: Date;
  time?: Date;
  name?: string;
  amount?: number;
  user?: User;
}

export class CreateCaffeineDTO {
  date: Date;
  time: Date;
  name: string;
  amount: number;
}

export class UpdateCaffeineDTO {
  _id?: Types.ObjectId;
  date: Date;
  time: Date;
  name: string;
  amount: number;
}
