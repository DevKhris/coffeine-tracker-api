import { AuthService } from './../auth/auth.service';
import { Schema, Types } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGraphQlGuard } from '../auth/jwt-auth-graphql.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query(() => User)
  @UseGuards(JwtAuthGraphQlGuard)
  async user(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.usersService.find(_id);
  }

  @Query(() => [User])
  async users(
    @Args('filters', { type: () => UserDTO, nullable: true }) filters?: UserDTO,
  ) {
    return this.usersService.findByField(filters);
  }

  @Mutation(() => User)
  async registerUser(@Args('newUser') newUser: CreateUserDTO) {
    return this.authService.registerUser(newUser);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id', { type: () => String }) _id: Types.ObjectId,
    @Args('updateUser')
    updateUser: UpdateUserDTO,
  ) {
    return this.usersService.update(_id, updateUser);
  }

  @Mutation(() => User)
  async deleteUser(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.usersService.delete(_id);
  }
}
