import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../../utils/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true }
      });

      if (!user || !user.password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role.name },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user: { id: user.id, email: user.email, role: user.role.name } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Admin creating new users (Requirement 2: Admin/Configurator create accounts)
  async register(req: Request, res: Response) {
    const { email, password, roleName } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = await prisma.role.findUnique({ where: { name: roleName } });
      
      if (!role) return res.status(400).json({ error: 'Invalid role' });

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          roleId: role.id
        }
      });

      res.json({ message: 'User created successfully', id: user.id });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
