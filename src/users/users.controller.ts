import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { UsersService } from './users.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { Public } from '../auth/decorators/is-public.decorator';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TODO: sposta in auth module
  @Public()
  @Post()
  createUser(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Patch(':id')
  updateUser(
    @CurrentUserId() currentUserId: string,
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body(ValidationPipe) updateUser: UpdateUserDto,
  ) {
    if (!id.equals(currentUserId)) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.usersService.updateUser(id, updateUser);
  }

  //TODO: l'utente può accedere solo al proprio profilo?
  @Get(':id')
  getUserById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getUserById(id);
  }
}
