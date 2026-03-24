"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']),
    PORT: zod_1.z.string().regex(/^\d+$/),
    JWT_SECRET: zod_1.z.string().min(32),
    TELEGRAM_BOT_TOKEN: zod_1.z.string().min(1),
    MONGODB_URI: zod_1.z.string().min(1), // Changed to min(1) to be flexible with internal Docker DNS
    CORS_WHITELIST: zod_1.z.string().optional(),
    RATE_LIMIT_WINDOW_MS: zod_1.z.string().regex(/^\d+$/),
    RATE_LIMIT_MAX: zod_1.z.string().regex(/^\d+$/)
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('Environment variables validation failed!', _env.error.format());
    process.exit(1);
}
exports.env = _env.data;
