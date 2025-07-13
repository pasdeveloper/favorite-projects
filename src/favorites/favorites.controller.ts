import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './models/add-favorite.dto';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  @ApiOperation({
    summary: 'Aggiungi progetto ai preferiti',
    description:
      "Aggiunge un progetto alla lista dei preferiti dell'utente autenticato",
  })
  @ApiBody({
    type: AddFavoriteDto,
    description: 'Dati del progetto da aggiungere ai preferiti',
  })
  createFavorite(
    @CurrentUserId() currentUserId: string,
    @Body(ValidationPipe) addFavorite: AddFavoriteDto,
  ) {
    return this.favoriteService.createFavorite(currentUserId, addFavorite);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Rimuovi progetto dai preferiti',
    description:
      "Rimuove un progetto dalla lista dei preferiti dell'utente. Un utente può rimuovere solo i propri preferiti.",
  })
  @ApiParam({
    name: 'id',
    description: 'ID del preferito da rimuovere (MongoDB ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  async removeFavorite(
    @CurrentUserId() currentUserId: string,
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ) {
    const canDelete = await this.favoriteService.isUserOwnFavorite(
      currentUserId,
      id,
    );
    if (!canDelete) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.favoriteService.removeFavorite(id);
  }

  @Get()
  @ApiOperation({
    summary: "Ottieni preferiti dell'utente",
    description:
      "Recupera la lista completa dei progetti preferiti dell'utente autenticato",
  })
  getUserFavorites(@CurrentUserId() currentUserId: string) {
    return this.favoriteService.getUserFavorites(currentUserId);
  }
}
