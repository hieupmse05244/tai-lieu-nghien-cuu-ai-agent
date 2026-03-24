"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const securityMiddleware = [
    (0, helmet_1.default)(),
    (0, cors_1.default)({ origin: ['https://trusted.domain.com'] }),
    (0, express_rate_limit_1.default)({
        windowMs: Number(process.env.RATE_LIMIT_WINDOW),
        max: Number(process.env.RATE_LIMIT_MAX)
    })
];
exports.default = securityMiddleware;
