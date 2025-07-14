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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { MapToDto } from '../core/decorators/map-to-dto.decorator';
import { FavoriteDto } from './models/favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  @MapToDto(FavoriteDto)
  @ApiOperation({
    summary: 'Aggiungi progetto ai preferiti',
    description:
      "Aggiunge un progetto alla lista dei preferiti dell'utente autenticato",
  })
  @ApiBody({
    type: AddFavoriteDto,
    description: 'Dati del progetto da aggiungere ai preferiti',
  })
  @ApiCreatedResponse({
    type: FavoriteDto,
    description: 'Preferito aggiunto con successo',
  })
  createFavorite(
    @CurrentUserId() currentUserId: string,
    @Body(ValidationPipe) addFavorite: AddFavoriteDto,
  ) {
    return this.favoriteService.createFavorite(currentUserId, addFavorite);
  }

  @Delete(':id')
  @MapToDto(FavoriteDto)
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
  @ApiOkResponse({
    type: FavoriteDto,
    description: 'Preferito rimosso con successo',
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
  @MapToDto(FavoriteDto)
  @ApiOperation({
    summary: "Ottieni preferiti dell'utente",
    description:
      "Recupera la lista completa dei progetti preferiti dell'utente autenticato",
  })
  @ApiOkResponse({
    type: [FavoriteDto],
    description: 'Preferiti recuperati con successo',
  })
  getUserFavorites(@CurrentUserId() currentUserId: string) {
    return this.favoriteService.getUserFavorites(currentUserId);
  }
}
