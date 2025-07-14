import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { DTO_MAPPING_KEY } from '../decorators/map-to-dto.decorator';
import { Document } from 'mongoose';

@Injectable()
export class MapToDtoInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const dtoClass = this.reflector.get<new () => unknown>(
      DTO_MAPPING_KEY,
      context.getHandler(),
    );

    if (!dtoClass) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) =>
            plainToInstance(
              dtoClass,
              this.isMongooseDocument(item) ? item.toObject() : item,
              {
                excludeExtraneousValues: true,
              },
            ),
          );
        }
        return plainToInstance(
          dtoClass,
          this.isMongooseDocument(data) ? data.toObject() : data,
          {
            excludeExtraneousValues: true,
          },
        );
      }),
    );
  }

  private isMongooseDocument = (obj: any): obj is Document => {
    return obj instanceof Document;
  };
}
