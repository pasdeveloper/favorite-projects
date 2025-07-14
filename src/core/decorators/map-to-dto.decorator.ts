import { SetMetadata } from '@nestjs/common';

export const DTO_MAPPING_KEY = 'dto_mapping';

export const MapToDto = <T>(
  dto: new (partial: Partial<T>) => T,
): MethodDecorator => {
  return SetMetadata(DTO_MAPPING_KEY, dto);
};
