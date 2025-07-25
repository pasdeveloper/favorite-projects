import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithPayload } from '../models/request-with-payload';

export const CurrentPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithPayload>();
    return request.payload;
  },
);
