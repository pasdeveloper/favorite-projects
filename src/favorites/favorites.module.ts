import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
})
export class FavoritesModule {}
