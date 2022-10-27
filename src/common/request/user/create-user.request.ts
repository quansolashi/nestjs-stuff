import { z } from 'zod';

export const CreateUserRequest = z.object({
  email: z.string().email(),
  name: z.string({
    required_error: 'Name is required',
  }),
  password: z.string(),
});
