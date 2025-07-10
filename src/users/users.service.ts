import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UsersService {
  private users: {}[] = [];

  createUser(createUser: CreateUserDto) {
    const maxId =
      this.users.length == 0 ? 0 : this.users[this.users.length - 1]['id'];
    this.users.push({ ...createUser, id: maxId + 1 });
  }

  updateUser(id: number, updateUser: UpdateUserDto) {
    const existingUser = this.users.find((u) => u['id'] == id);
    if (!existingUser) {
      // TODO: user not found
      return;
    }
    const existingUserIndex = this.users.indexOf(existingUser);
    const updatedUser = { ...existingUser, ...updateUser };
    this.users[existingUserIndex] = updatedUser;
  }

  getUser(id: number) {
    const user = this.users.find((u) => u['id'] == id);
    return user;
  }
}
