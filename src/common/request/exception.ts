import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';
import { mappingZodErrors } from './shared';

export class ZodValidationError extends BadRequestException {
  constructor(private error: ZodError) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: mappingZodErrors(error.errors),
    });
  }
}
