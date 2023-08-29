import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async registerUser(@Body() newUser: CreateUserDTO): Promise<User> {
    return await this.authService.registerUser(newUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async validateUser(@Body() user: User): Promise<unknown> {
    return await this.authService.loginUser(user.username, user.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): User {
    return req.user;
  }
}
