import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './models/add-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  createFavorite(@Body(ValidationPipe) addFavorite: AddFavoriteDto) {
    //TODO: prendi userId dalla sessione
    const userId = 'abc';
    return this.favoriteService.createFavorite(userId, addFavorite);
  }
}
