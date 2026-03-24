"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || process.env.CORS_WHITELIST?.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
const rateLimitOptions = (0, express_rate_limit_1.default)({
    windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MS || '15') || 15) * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    message: 'Too many requests from this IP, please try again later.',
});
exports.default = {
    helmet: (0, helmet_1.default)(),
    cors: (0, cors_1.default)(corsOptions),
    rateLimit: rateLimitOptions,
};
