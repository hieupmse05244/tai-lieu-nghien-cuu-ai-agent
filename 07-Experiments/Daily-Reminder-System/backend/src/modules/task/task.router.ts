import { Router } from 'express';
import { TaskController } from './controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/:taskId/rotate', authMiddleware, (req, res) => TaskController.rotateTask(req, res));

export default router;
