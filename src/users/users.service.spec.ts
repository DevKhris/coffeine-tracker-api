import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { createUserDTO, updateUserDTO } from 'src/dto/user.dto';

describe('AuthService', () => {
  let userService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should return a array of users from service', async () => {
    const users: User[] = [
      {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'doyouwanttoplayagame',
      },
      {
        username: 'amanda',
        email: 'amandayoung@jigsaw.com',
        password: 'doyoulearntotrustme',
      },
    ];
    jest.spyOn(userService, 'findAll').mockResolvedValue(users);
    const result = await userService.findAll();
    expect(result).toEqual(users);
  });

  it('should return a user by id from service', async () => {
    const id: string = 'loremipsumdolor';
    const user: User = {
      username: 'john',
      email: 'johnkramer@jigsaw.com',
      password: 'doyouwanttoplayagame',
    };

    jest.spyOn(userService, 'find').mockResolvedValue(user);
    const result = await userService.find(id);
    expect(result).toEqual(user);
  });

  it('should return a new user object from service', async () => {
    const user: createUserDTO = {
      username: 'john',
      email: 'johnkramer@jigsaw.com',
      password: 'doyouwanttoplayagame',
    };

    jest.spyOn(userService, 'create').mockResolvedValue(user);
    const result = await userService.create(user);
    expect(result).toEqual(user);
  });

  it('should return a updated user object from service', async () => {
    const id: string = 'loremipsumdolor';
    const user: updateUserDTO = {
      username: 'mark',
      email: 'markhoffman@jigsaw.com',
    };

    jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(user);
    const result = await userService.update(id, user);

    expect(result).toEqual(user);
  });

  it('should return the deleted user status from service', async () => {
    const id: string = 'loremipsumdolor';

    jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue({});
    const result = await userService.delete(id);

    expect(result).toEqual({});
  });
});
