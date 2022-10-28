import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { Source } from './types';
import { zodValidate } from './validate';

@Injectable()
export class ZodGuard implements CanActivate {
  constructor(private schema: ZodSchema, private source: Source) {}

  canActivate(context: ExecutionContext) {
    const data = context.switchToHttp().getRequest()[this.source];
    zodValidate(data, this.schema);

    return true;
  }
}
