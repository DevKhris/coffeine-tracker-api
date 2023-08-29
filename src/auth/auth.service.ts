import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerUser(newUser: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newUser.password, salt);

    newUser = { ...newUser, password: hash };

    const result = await this.usersService.create(newUser);

    return result;
  }

  async loginUser(
    username: string,
    passphrase: string,
  ): Promise<{ access_token: string }> {
    const user: User = await this.usersService.findByField({
      username: username,
    });

    if (!bcrypt.compare(passphrase, user?.password)) {
      throw new UnauthorizedException('Unauthorized');
    }

    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
