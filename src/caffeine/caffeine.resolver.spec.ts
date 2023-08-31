import { UsersService } from '../users/users.service';
import { User } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Caffeine } from '../schemas/caffeine.schema';
import { CaffeineService } from './caffeine.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CaffeineResolver } from './caffeine.resolver';

describe('CaffeineResolver', () => {
  let caffineResolver: CaffeineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CaffeineResolver,
        CaffeineService,
        UsersService,
        {
          provide: getModelToken(Caffeine.name),
          useValue: {
            find: jest.fn(),
            findByField: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
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

    caffineResolver = module.get<CaffeineResolver>(CaffeineResolver);
  });

  it('should be defined', () => {
    expect(caffineResolver).toBeDefined();
  });
});
