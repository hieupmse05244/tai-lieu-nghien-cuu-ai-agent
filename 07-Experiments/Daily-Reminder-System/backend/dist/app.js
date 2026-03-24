"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
// Routers
const auth_router_1 = __importDefault(require("./modules/auth/auth.router"));
const group_router_1 = __importDefault(require("./modules/group/group.router"));
const task_router_1 = __importDefault(require("./modules/task/task.router"));
const notification_controller_1 = __importDefault(require("./modules/notification/notification.controller"));
const app = (0, express_1.default)();
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.env.CORS_WHITELIST }));
app.use((0, express_rate_limit_1.default)({
    windowMs: parseInt(env_1.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(env_1.env.RATE_LIMIT_MAX, 10) || 100
}));
app.use(express_1.default.json());
// Routes Integration
app.use('/api/v1/auth', auth_router_1.default);
app.use('/api/v1/groups', group_router_1.default);
app.use('/api/v1/tasks', task_router_1.default);
app.use('/api/v1/notifications', notification_controller_1.default);
// Health Check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[Global Error]', err);
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
        code: err.code || 'INTERNAL_ERROR'
    });
});
exports.default = app;
