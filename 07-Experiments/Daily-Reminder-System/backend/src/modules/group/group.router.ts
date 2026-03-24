import { Router } from 'express';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repository';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const groupRepository = new GroupRepository();
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);

router.post('/', authMiddleware, (req, res, next) => groupController.createGroup(req, res, next));
router.patch('/:id/link-telegram', authMiddleware, (req, res, next) => groupController.linkTelegram(req, res, next));

export default router;
