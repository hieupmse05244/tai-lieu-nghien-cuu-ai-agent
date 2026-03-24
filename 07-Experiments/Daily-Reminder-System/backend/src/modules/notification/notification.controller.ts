import { Router } from 'express';
import { notificationService } from './notification.service';

const router = Router();

router.post('/dispatch', async (req, res, next) => {
  try {
    await notificationService.dispatchNotifications();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
