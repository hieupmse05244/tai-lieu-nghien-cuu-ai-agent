import { Request, Response } from 'express';
import AuthService from './auth.service';
import { RegisterInput, LoginInput, validateRegisterInput, validateLoginInput } from './auth.validator';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    const input: RegisterInput = req.body;
    try {
      validateRegisterInput(input);
      const user = await this.authService.register(input.username, input.password, input.email);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const input: LoginInput = req.body;
    try {
      validateLoginInput(input);
      const token = await this.authService.login(input.username, input.password);
      res.json({ success: true, data: { token } });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}

export default AuthController;
