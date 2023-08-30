import { AuthService } from './../auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UsersService,
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findByField: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });
});
