import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';

// TODO: sposta in config module
const dbUri = 'mongodb://localhost:27017/user_projects';

@Module({
  imports: [UsersModule, ProjectsModule, MongooseModule.forRoot(dbUri)],
  controllers: [],
  providers: [],
})
export class AppModule {}
