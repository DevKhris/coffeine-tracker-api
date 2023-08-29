import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { createUserDTO } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async registerUser(@Body() newUser: createUserDTO): Promise<User> {
    return await this.authService.registerUser(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async validateUser(@Body() user: User): Promise<unknown> {
    return await this.authService.loginUser(user.username, user.password);
  }
}
