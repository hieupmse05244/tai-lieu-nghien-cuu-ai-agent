import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const securityMiddleware = [
  helmet(),
  cors({ origin: ['https://trusted.domain.com'] }),
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW),
    max: Number(process.env.RATE_LIMIT_MAX)
  })
];

export default securityMiddleware;
