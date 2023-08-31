import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Caffeine } from '../schemas/caffeine.schema';
import {
  CaffeineDTO,
  CreateCaffeineDTO,
  UpdateCaffeineDTO,
} from '../dto/caffeine.dto';
import { UsersService } from '../users/users.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class CaffeineService {
  constructor(
    @InjectModel(Caffeine.name) private caffeine: Model<Caffeine>,
    private usersService: UsersService,
  ) {}

  async findByUserId(
    userId: Types.ObjectId,
    filters: object,
  ): Promise<Caffeine[]> {
    return await this.caffeine
      .find({ user: userId })
      .populate({ path: 'user', match: filters })
      .exec();
  }

  async createByUserId(
    userId: Types.ObjectId,
    newCaffeine: CreateCaffeineDTO,
  ): Promise<Caffeine> {
    const user: User = await this.usersService.find(userId);
    const caffeine: CaffeineDTO = {
      ...newCaffeine,
      user: user,
    };
    return await this.caffeine.create(caffeine);
  }

  async updateById(
    caffeineId: Types.ObjectId,
    updateCaffeine: UpdateCaffeineDTO,
  ): Promise<Caffeine> {
    return await this.caffeine.findOneAndUpdate(caffeineId, updateCaffeine);
  }

  async deleteById(caffeineId: Types.ObjectId): Promise<boolean> {
    return await this.caffeine.findByIdAndDelete(caffeineId);
  }
}
