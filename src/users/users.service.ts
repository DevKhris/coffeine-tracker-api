import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { createUserDTO, updateUserDTO } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.user.find();
  }

  async find(id: string): Promise<User> {
    return await this.user.findById(id);
  }

  async findByField(data): Promise<User> {
    return await this.user.findOne(data);
  }

  async create(newUser: createUserDTO): Promise<User> {
    return await this.user.create(newUser);
  }

  async update(id: string, updateUser: updateUserDTO): Promise<User> {
    return await this.user.findByIdAndUpdate(id, updateUser);
  }

  async delete(id: string): Promise<User> {
    return await this.user.findByIdAndDelete(id);
  }
}
