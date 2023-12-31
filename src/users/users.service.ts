import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.user.find().exec();
  }

  async find(id: Types.ObjectId): Promise<User> {
    return await this.user.findById(id).exec();
  }

  async findByField(filters: UserDTO): Promise<User> {
    return await this.user.findOne(filters).exec();
  }

  async create(newUser: CreateUserDTO): Promise<User> {
    return await this.user.create(newUser);
  }

  async update(id: Types.ObjectId, updateUser: UpdateUserDTO): Promise<User> {
    return await this.user.findByIdAndUpdate(id, updateUser);
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    return await this.user.findByIdAndDelete(id);
  }
}
