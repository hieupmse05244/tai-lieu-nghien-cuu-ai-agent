import { z } from 'zod';

export const RegisterInput = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email()
});

export const LoginInput = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

export function validateRegisterInput(input: unknown): asserts input is z.infer<typeof RegisterInput> {
  RegisterInput.parse(input);
}

export function validateLoginInput(input: unknown): asserts input is z.infer<typeof LoginInput> {
  LoginInput.parse(input);
}
