import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';

// Routers
import authRouter from './modules/auth/auth.router';
import groupRouter from './modules/group/group.router';
import taskRouter from './modules/task/task.router';
import notificationRouter from './modules/notification/notification.controller';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: env.CORS_WHITELIST }));
app.use(
  rateLimit({
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(env.RATE_LIMIT_MAX, 10) || 100
  })
);

app.use(express.json());

// Routes Integration
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/notifications', notificationRouter);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Global Error]', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR'
  });
});

export default app;
