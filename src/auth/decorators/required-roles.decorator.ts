import { SetMetadata } from '@nestjs/common';

export const REQUIRED_ROLES_KEY = 'requiredRoles';
export const RequiredRoles = (...roles: string[]) =>
  SetMetadata(REQUIRED_ROLES_KEY, roles);
