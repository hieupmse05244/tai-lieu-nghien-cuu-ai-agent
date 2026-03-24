// Centralized error handling middleware
import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, code: string, statusCode: number = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
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

export { AppError };
