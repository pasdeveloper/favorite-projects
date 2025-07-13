import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_ROLES_KEY } from '../decorators/required-roles.decorator';
import { RequestWithPayload } from '../models/request-with-payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      REQUIRED_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithPayload>();
    const payload = request.payload;

    if (!payload) {
      // in teoria dovrebbe già essere autenticato dall'auth guard globale
      throw new UnauthorizedException();
    }

    const hasRequiredRole = requiredRoles.some((role) => role === payload.role);

    if (!hasRequiredRole) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
