import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus {
  status?: number;
  message?: string;
}

export const errorHandler = (
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
