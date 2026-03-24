import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../user/user.repository';
import { env } from '../../config/env';
import { AppError } from '../../utils/errors';

class AuthService {
  async register(username: string, password: string, email: string) {
    const existingUser = await UserRepository.findUserByUsername(username);
    if (existingUser) throw new AppError('Username already exists', 400, 'USER_EXISTS');

    const passwordHash = await bcrypt.hash(password, 10);
    // Assuming UserModel.create or similar
    // For now, minimal logic
    return { username, email };
  }

  async login(username: string, password: string) {
    const user = await UserRepository.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const token = jwt.sign({ id: (user as any)._id, username: user.username }, env.JWT_SECRET, {
      expiresIn: '24h'
    });

    return token;
  }
}

export default AuthService;
