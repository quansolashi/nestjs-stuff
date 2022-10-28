import { ZodIssue } from 'zod';

export function mappingZodErrors(errors: ZodIssue[]) {
  return errors.reduce((obj, error) => {
    const key = error.path?.[0];
    return Object.assign(obj, { [key]: error.message });
  }, {});
}
