import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Schema, ObjectId } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDTO {
  @Field(() => String)
  _id?: ObjectId;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
@InputType()
export class CreateUserDTO {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class UpdateUserDTO {
  @Field(() => String)
  _id?: ObjectId;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
