import { JwtPayload, verify } from 'jsonwebtoken';
import config from './config';
import { Request } from 'express';
export function authenticateUser(request: Request): string | null {
  try {
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return null;
    }

    const token = header.split(' ')[1];
    const tokenPayload = verify(token, config.JWT_SECRET);
    const userId = (tokenPayload as JwtPayload & { userId: string }).userId;
    return userId;
  } catch (error) {
    console.error('Authentication error:', error);
  }
  return null;
}
