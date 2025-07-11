import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async createUser(createUser: CreateUserDto) {
    const salt = parseInt(this.configService.get<string>('BCRYPT_SALT', '10'));
    const hashedPassword = await bcrypt.hash(createUser.password, salt);
    const newUser = new this.userModel({
      ...createUser,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async updateUser(id: string, updateUser: UpdateUserDto) {
    if (updateUser.password) {
      const salt = parseInt(
        this.configService.get<string>('BCRYPT_SALT', '10'),
      );
      updateUser.password = await bcrypt.hash(updateUser.password, salt);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
