import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { createUserDTO, updateUserDTO } from 'src/dto/user.dto';

describe('AuthService', () => {
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('test user service functions', () => {
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
      jest.spyOn(usersService, 'findAll').mockResolvedValue(users);
      const result = await usersService.findAll();
      expect(result).toEqual(users);
    });

    it('should return a user by id from service', async () => {
      const id: string = 'loremipsumdolor';
      const user: User = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'doyouwanttoplayagame',
      };

      jest.spyOn(usersService, 'find').mockResolvedValue(user);
      const result = await usersService.find(id);
      expect(result).toEqual(user);
    });

    it('should return a user by field from service', async () => {
      const user: User = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'doyouwanttoplayagame',
      };

      const query = { username: 'john' };

      jest.spyOn(usersService, 'findByField').mockResolvedValue(user);
      const result = await usersService.findByField(query);
      expect(result).toEqual(user);
    });

    it('should return a new user object from service', async () => {
      const user: createUserDTO = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'doyouwanttoplayagame',
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(user);
      const result = await usersService.create(user);
      expect(result).toEqual(user);
    });

    it('should return a updated user object from service', async () => {
      const id: string = 'loremipsumdolor';
      const user: updateUserDTO = {
        username: 'mark',
        email: 'markhoffman@jigsaw.com',
      };

      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(user);
      const result = await usersService.update(id, user);

      expect(result).toEqual(user);
    });

    it('should return the deleted user status from service', async () => {
      const id: string = 'loremipsumdolor';

      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue({});
      const result = await usersService.delete(id);

      expect(result).toEqual({});
    });
  });
});
