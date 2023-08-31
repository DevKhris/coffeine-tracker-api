import { Field, InputType } from '@nestjs/graphql';
import { User } from 'src/schemas/user.schema';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';
import { Schema, Types } from 'mongoose';

@InputType()
export class CaffeineDTO {
  @Field(() => String)
  _id?: Types.ObjectId;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  date?: Date;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  time?: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  user?: User;
}

@InputType()
export class CreateCaffeineDTO {
  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

@InputType()
export class UpdateCaffeineDTO {
  @Field(() => String)
  _id?: Types.ObjectId;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsNotEmpty()
  date?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsNotEmpty()
  time?: Date;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  amount?: number;
}
