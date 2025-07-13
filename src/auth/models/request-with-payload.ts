import { JwtPayload } from './jwt-payload';
import { Request } from 'express';

export interface RequestWithPayload extends Request {
  payload?: JwtPayload;
}
