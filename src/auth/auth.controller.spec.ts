import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { createUserDTO } from '../dto/user.dto';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findByField: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('authentication', () => {
    it('should return the registered user object', async () => {
      const newUser: createUserDTO = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'opentheblackbox',
      };

      jest
        .spyOn(authService, 'registerUser')
        .mockImplementation(async () => newUser);
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(newUser)
        .expect(201);

      expect(response.body).toEqual(newUser);
    });

    it('should return a token if user is validated', async () => {
      const newUser: createUserDTO = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'opentheblackbox',
      };

      const token = { access_token: 'mocked-jwt-tokens' };

      jest.spyOn(authService, 'loginUser').mockResolvedValue(token);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(newUser)
        .expect(200);

      expect(response.body).toEqual(token);
    });
  });
});
