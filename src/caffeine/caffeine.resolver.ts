import { Schema, Types } from 'mongoose';
import { CaffeineService } from './caffeine.service';
import { Caffeine } from '../schemas/caffeine.schema';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCaffeineDTO,
  UpdateCaffeineDTO,
  CaffeineDTO,
} from '../dto/caffeine.dto';

@Resolver(() => Caffeine)
export class CaffeineResolver {
  constructor(private caffeineService: CaffeineService) {}

  @Query(() => Caffeine)
  async caffeines(
    @Args('userId', { type: () => String })
    userId: Types.ObjectId,
    @Args('filters', { type: () => CaffeineDTO })
    filters: CaffeineDTO,
  ) {
    return await this.caffeineService.findByUserId(userId, filters);
  }

  @Mutation(() => Caffeine)
  async createCaffeine(
    @Args('userId', { type: () => String })
    userId: Types.ObjectId,
    @Args('newCaffeine', { type: () => CreateCaffeineDTO })
    newCaffeine: CreateCaffeineDTO,
  ) {
    return await this.caffeineService.createByUserId(userId, newCaffeine);
  }

  @Mutation(() => Caffeine)
  async updateCaffeine(
    @Args('caffeineId', { type: () => String })
    caffeineId: Types.ObjectId,
    @Args('updateCaffeine', { type: () => UpdateCaffeineDTO })
    updateCaffeine: UpdateCaffeineDTO,
  ) {
    return await this.caffeineService.updateById(caffeineId, updateCaffeine);
  }

  @Mutation(() => Caffeine)
  async deleteCaffeine(
    @Args('caffeineId', { type: () => String })
    caffeineId: Types.ObjectId,
  ) {
    return await this.caffeineService.deleteById(caffeineId);
  }
}
