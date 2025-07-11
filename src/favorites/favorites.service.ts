import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './schemas/favorite.schema';
import { Model } from 'mongoose';
import { AddFavoriteDto } from './models/add-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async createFavorite(userId: string, addFavorite: AddFavoriteDto) {
    const favorite = new this.favoriteModel({
      ...addFavorite,
      userId,
    });
    return favorite.save();
  }
}
