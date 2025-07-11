import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mydb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
