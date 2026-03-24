import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().regex(/^\d+$/),
  JWT_SECRET: z.string().min(32),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  MONGODB_URI: z.string().min(1), // Changed to min(1) to be flexible with internal Docker DNS
  CORS_WHITELIST: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().regex(/^\d+$/),
  RATE_LIMIT_MAX: z.string().regex(/^\d+$/)
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Environment variables validation failed!', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
