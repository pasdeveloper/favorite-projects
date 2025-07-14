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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { MapToDto } from '../core/decorators/map-to-dto.decorator';
import { UserDto } from './models/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TODO: sposta in auth module?
  @Public()
  @Post()
  @MapToDto(UserDto)
  @ApiOperation({
    summary: 'Registra un nuovo utente',
    description:
      'Crea un nuovo account utente. Questo endpoint è pubblico e non richiede autenticazione.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dati per la registrazione del nuovo utente',
  })
  @ApiCreatedResponse({
    type: UserDto,
    description: 'Utente creato con successo',
  })
  createUser(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Patch(':id')
  @MapToDto(UserDto)
  @ApiOperation({
    summary: 'Aggiorna il profilo utente',
    description:
      'Aggiorna i dati del profilo utente. Un utente può modificare solo il proprio profilo.',
  })
  @ApiParam({
    name: 'id',
    description: "ID dell'utente da aggiornare (MongoDB ObjectId)",
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: "Dati per l'aggiornamento del profilo utente",
  })
  @ApiOkResponse({
    type: UserDto,
    description: 'Utente aggiornato con successo',
  })
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
  @MapToDto(UserDto)
  @ApiOperation({
    summary: 'Ottieni profilo utente',
    description:
      'Recupera i dati del profilo di un utente specifico utilizzando il suo ID',
  })
  @ApiParam({
    name: 'id',
    description: "ID dell'utente (MongoDB ObjectId)",
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({
    type: UserDto,
    description: 'Utente recuperato con successo',
  })
  getUserById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getUserById(id);
  }
}
