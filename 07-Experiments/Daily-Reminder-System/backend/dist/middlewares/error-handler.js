"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
class AppError extends Error {
    constructor(message, code, statusCode = 500) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({
        success: false,
        error: {
            code: err.code || 'UNKNOWN_ERROR',
            message: err.message
        },
        meta: {
            requestId: req.headers['x-request-id'] || '',
            timestamp: new Date().toISOString(),
            version: 'v1'
        }
    });
}
