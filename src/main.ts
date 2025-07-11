import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // abilita @Type() nei dto
      whitelist: true, // rimuove proprietà non definite nei dto
      forbidNonWhitelisted: true, // eccezione se ci sono proprietà extra
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
