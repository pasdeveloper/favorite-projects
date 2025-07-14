import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MapToDtoInterceptor } from './interceptors/map-to-dto.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MapToDtoInterceptor,
    },
  ],
})
export class CoreModule {}
