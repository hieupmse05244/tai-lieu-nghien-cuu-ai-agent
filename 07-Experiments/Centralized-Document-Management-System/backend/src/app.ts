import dotenv from 'dotenv';
// Load env immediately before other imports
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import ResourceRouter from './modules/resource/router';
import UserRouter from './modules/user/router';
import AuthRouter from './modules/auth/router';
import { authMiddleware } from './middlewares/auth.middleware';

const app = express();
const port = process.env.PORT || 4000;

// 1. Middlewares (Security & Utilities)
app.use(helmet());

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 1.5. API Routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/resources', authMiddleware, ResourceRouter);
app.use('/api/v1/users', authMiddleware, UserRouter);

// 2. Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 3. Centralized Error Handler (Standard 2.1)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.status || 500;
  
  // Don't leak implementation details in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;

  res.status(status).json({
    error: {
      message,
      status
    }
  });
});

// 4. Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[Server]: Backend is running at http://localhost:${port}`);
  });
}

export default app;
