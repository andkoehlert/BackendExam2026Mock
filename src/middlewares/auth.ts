// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : authHeader;

  try {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error('TOKEN_SECRET not configured');
    }

    const verified = jwt.verify(token, secret) as { id: string };
    req.userId = verified.id;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
