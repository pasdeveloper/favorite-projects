import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // abilita @Type() nei dto
      whitelist: true, // rimuove proprietà non definite nei dto
      forbidNonWhitelisted: true, // eccezione se ci sono proprietà extra
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Favorite Projects')
    .setDescription('API di prova')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
