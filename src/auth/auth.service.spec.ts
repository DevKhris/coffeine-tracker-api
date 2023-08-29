import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { createUserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<User>>(getModelToken(User.name));

    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((password, hashedPassword) => {
        return password === hashedPassword;
      });

    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'mocked-jwt-token');
  });

  describe('register user', () => {
    it('should register a new user', async () => {
      const newUser: createUserDTO = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'opentheblackbox',
      };

      await authService.registerUser(newUser);

      jest.spyOn(usersService, 'findByField').mockResolvedValue(newUser);
      const user = await usersService.findByField({
        username: newUser.username,
      });
      expect(user).toEqual(newUser);
    });
  });

  describe('login user', () => {
    it('should return user if the credentials are validated', async () => {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash('opentheblackbox', salt);

      const newUser: createUserDTO = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: hash,
      };

      await usersService.create(newUser);

      jest.spyOn(usersService, 'findByField').mockResolvedValue(newUser);
      const result = await authService.loginUser(
        newUser.username,
        newUser.password,
      );
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    });

    it('should throw UnauthorizedException if the credentials are invalid', async () => {
      const user: createUserDTO = {
        username: 'mark',
        email: 'markhoffman@jigsaw.com',
        password: 'opentheblackbox',
      };

      jest.spyOn(usersService, 'findByField').mockResolvedValue(null);

      await expect(
        authService.loginUser(user.username, user.password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
