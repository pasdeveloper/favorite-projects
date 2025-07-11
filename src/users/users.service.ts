import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UsersService {
  private users: {}[] = [];

  createUser(createUser: CreateUserDto) {
    const lastId =
      this.users.length == 0 ? 0 : this.users[this.users.length - 1]['id'];
    const newUser = { ...createUser, id: lastId + 1 };
    this.users.push(newUser);
    return newUser;
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

  getUser(id: number) {
    const user = this.users.find((u) => u['id'] == id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
