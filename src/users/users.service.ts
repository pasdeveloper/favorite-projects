import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private users: object[] = [];

  createUser(createUser: CreateUserDto) {
    const newUser = new this.userModel(createUser);
    return newUser.save();
  }

  updateUser(id: number, updateUser: UpdateUserDto) {
    const existingUser = this.users.find((u) => u['id'] == id);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const existingUserIndex = this.users.indexOf(existingUser);
    const updatedUser = { ...existingUser, ...updateUser };
    this.users[existingUserIndex] = updatedUser;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
