import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const corsOptions = {
  origin: function(origin: any, callback: any) {
    if (!origin || process.env.CORS_WHITELIST?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const rateLimitOptions = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MS || '15') || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  message: 'Too many requests from this IP, please try again later.',
});

export default {
  helmet: helmet(),
  cors: cors(corsOptions),
  rateLimit: rateLimitOptions,
};