import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import { ErrorWithStatus } from '../types';

const errorHandler = (
  error: ErrorWithStatus,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (response.headersSent) {
    return next(error);
  }
  const { status = 500, message = 'Oops, something went wrong!' } = error;
  return response.status(status).json({ status, message });
};

export default { helmet, passport, errorHandler };
