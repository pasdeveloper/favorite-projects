import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
    ProjectsModule,
  ],
})
export class FavoritesModule {}
