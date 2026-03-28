import { Router } from 'express';
import { UserController } from './controller';

const router = Router();
const controller = new UserController();

router.get('/search', controller.searchUsers);
router.get('/groups', controller.listGroups);

export default router;
