import { ZodSchema } from 'zod';
import { ZodValidationError } from './exception';

export function zodValidate(value: unknown, schema: ZodSchema) {
  const result = schema.safeParse(value);

  if (result.success === false) {
    throw new ZodValidationError(result.error);
  }

  return result.data;
}
