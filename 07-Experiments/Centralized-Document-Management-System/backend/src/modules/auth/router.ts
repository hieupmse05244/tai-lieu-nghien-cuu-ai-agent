import { Router } from 'express';
import { AuthController } from './controller';
import { authMiddleware, checkRole } from '../../middlewares/auth.middleware';
import { RoleType } from '@prisma/client';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);

// Only Admin or Configurator can create users
router.post(
  '/register', 
  authMiddleware, 
  checkRole([RoleType.ADMIN, RoleType.CONFIGURATOR]), 
  controller.register
);

export default router;
