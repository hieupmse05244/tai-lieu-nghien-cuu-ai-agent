import { Router } from 'express';
import AuthController from './auth.controller';
import AuthService from './auth.service';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;
