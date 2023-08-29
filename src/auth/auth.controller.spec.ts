import { MockJwtAuthGuard } from './../mocks/mock-jwt-auth-guard.mock';
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
import { JwtAuthGuard } from './jwt-auth.guard';
import 'dotenv/config';

describe('AuthController', () => {
  let app: INestApplication;
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

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
        {
          provide: JwtAuthGuard,
          useClass: MockJwtAuthGuard,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
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

  describe('/GET profile', () => {
    it('should return user from the req', async () => {
      const currentUser: User = {
        username: 'john',
        email: 'johnkramer@jigsaw.com',
        password: 'opentheblackbox',
      };

      const token = await jwtService.sign(currentUser, {
        noTimestamp: true,
        secret: process.env.APP_SECRET,
      });
      jest.spyOn(authController, 'validateUser').mockResolvedValue(currentUser);

      const response = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toEqual(currentUser);
    });
  });
});
