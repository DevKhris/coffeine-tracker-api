import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  username?: string;
  @IsString()
  @IsEmail()
  email?: string;
  @IsString()
  @IsNotEmpty()
  password?: string;
}
