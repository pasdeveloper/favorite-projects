import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { UsersService } from './users.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Get(':id')
  getUserById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getUserById(id);
  }
}
