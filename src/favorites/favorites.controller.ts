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

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  createFavorite(
    @CurrentUserId() currentUserId: string,
    @Body(ValidationPipe) addFavorite: AddFavoriteDto,
  ) {
    return this.favoriteService.createFavorite(currentUserId, addFavorite);
  }

  @Delete(':id')
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
  getUserFavorites(@CurrentUserId() currentUserId: string) {
    return this.favoriteService.getUserFavorites(currentUserId);
  }
}
