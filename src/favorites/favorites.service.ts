import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './schemas/favorite.schema';
import { Model, Types } from 'mongoose';
import { AddFavoriteDto } from './models/add-favorite.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
    private projectsService: ProjectsService,
  ) {}

  async createFavorite(userId: string, addFavorite: AddFavoriteDto) {
    const favoriteProject = await this.projectsService.getProject(
      addFavorite.projectId,
    );
    if (!favoriteProject) {
      throw new NotFoundException('Project not found');
    }

    const existingFavorite = await this.favoriteModel.findOne({
      projectId: addFavorite.projectId,
      userId,
    });
    if (existingFavorite) {
      throw new ConflictException('Project already is user favorite');
    }

    const favorite = new this.favoriteModel({
      ...addFavorite,
      userId,
    });
    return favorite.save();
  }

  removeFavorite(favoriteId: Types.ObjectId) {
    return this.favoriteModel.findByIdAndDelete(favoriteId);
  }

  async isUserOwnFavorite(userId: string, favoriteId: Types.ObjectId) {
    const favorite = await this.favoriteModel.findOne({
      _id: favoriteId,
      userId,
    });
    return !!favorite;
  }

  getUserFavorites(userId: string) {
    return this.favoriteModel.find({ userId }).exec();
  }
}
