import { Caffeine, CaffeineDocument } from './../schemas/caffeine.schema';
import { Types, Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CaffeineService } from './caffeine.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCaffeineDTO, UpdateCaffeineDTO } from '../dto/caffeine.dto';
import { UsersService } from '../users/users.service';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

describe('CaffeineService', () => {
  let caffeineService: CaffeineService;
  let caffeineModel: Model<CaffeineDocument>;

  const userId: Types.ObjectId = new Types.ObjectId('614a6d3d9d7e7d9f4a8c6a82');
  const caffeineId: Types.ObjectId = new Types.ObjectId(
    '64ef3be195abbff6ea8da85f',
  );

  const caffeines: Caffeine[] = [
    {
      _id: userId,
      name: 'Energy Drink',
      amount: 200,
      time: new Date(),
      date: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        CaffeineService,
        UsersService,
        {
          provide: getModelToken(Caffeine.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    caffeineService = module.get<CaffeineService>(CaffeineService);
    caffeineModel = module.get<Model<CaffeineDocument>>(
      getModelToken(Caffeine.name),
    );
  });

  it('should return a array of caffeine from a user from service', async () => {
    jest.spyOn(caffeineService, 'findByUserId').mockResolvedValue(caffeines);
    const result = await caffeineService.findByUserId(userId, {});
    expect(result).toEqual(caffeines);
  });

  it('should return a caffeine created by user from service', async () => {
    const newCaffeine: CreateCaffeineDTO = {
      name: 'Black Tea',
      amount: 60,
      time: new Date(),
      date: new Date(),
    };

    jest
      .spyOn(caffeineService, 'createByUserId')
      .mockResolvedValue(newCaffeine);

    const result = await caffeineService.createByUserId(userId, newCaffeine);
    expect(result).toEqual(newCaffeine);
  });

  it('should return a caffeine updated by user from service', async () => {
    const updateCaffeine: UpdateCaffeineDTO = {
      _id: caffeineId,
      name: 'Energy Drink',
      amount: 200,
      time: new Date(),
      date: new Date(),
    };

    const caffeine: Caffeine = {
      _id: caffeineId,
      name: 'Energy Drink',
      amount: 200,
      time: new Date(),
      date: new Date(),
    };

    jest.spyOn(caffeineService, 'updateById').mockResolvedValue(caffeine);
    const result = await caffeineService.updateById(caffeineId, updateCaffeine);
    expect(result).toEqual(updateCaffeine);
  });

  it('should return a boolean when caffeine is deleted by user from service', async () => {
    jest.spyOn(caffeineService, 'deleteById').mockResolvedValue(true);
    const result = await caffeineService.deleteById(caffeineId);

    expect(result).toBe(true);
  });
});
