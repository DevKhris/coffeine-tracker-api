import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from './users.service';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

describe('AuthService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;
  const id: Types.ObjectId = new Types.ObjectId('614a6d3d9d7e7d9f4a8c6a82');
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
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
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
      const user: CreateUserDTO = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'doyouwanttoplayagame',
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(user);
      const result = await usersService.create(user);
      expect(result).toEqual(user);
    });

    it('should return a updated user object from service', async () => {
      const user: UpdateUserDTO = {
        username: 'mark',
        email: 'markhoffman@jigsaw.com',
      };

      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(user);
      const result = await usersService.update(id, user);

      expect(result).toEqual(user);
    });

    it('should return the deleted user status from service', async () => {
      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue(true);
      const result = await usersService.delete(id);

      expect(result).toBe(true);
    });
  });
});
