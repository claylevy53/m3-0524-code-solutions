/* eslint-disable @typescript-eslint/no-unused-vars -- Remove me */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ClientError } from './client-error.js';

const hashKey = process.env.TOKEN_SECRET ?? '';
if (!hashKey) throw new Error('TOKEN_SECRET not found in env');

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new ClientError(401, 'authentication required');
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new ClientError(401, 'authentication required');
    }

    jwt.verify(token, hashKey, (err, payload) => {
      if (err) {
        throw new ClientError(401, 'authentication required');
      }

      req.user = payload as Request['user'];
      next();
    });
  } catch (err) {
    next(err);
  }
}
