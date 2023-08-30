import { AuthService } from './../auth/auth.service';
import { Schema, ObjectId } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query(() => User)
  async user(@Args('_id', { type: () => String }) _id: ObjectId) {
    return this.usersService.find(_id);
  }

  @Query(() => [User])
  async users(@Args('filters', { nullable: true }) filters?: UserDTO) {
    return this.usersService.findByField(filters);
  }

  @Mutation(() => User)
  async registerUser(@Args('newUser') newUser: CreateUserDTO) {
    return this.authService.registerUser(newUser);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id', { type: () => String }) _id: ObjectId,
    @Args('updateUser')
    updateUser: UpdateUserDTO,
  ) {
    return this.usersService.update(_id, updateUser);
  }

  @Mutation(() => User)
  async deleteUser(@Args('_id', { type: () => String }) _id: ObjectId) {
    return this.usersService.delete(_id);
  }
}
