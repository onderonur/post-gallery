import {
  ErrorRequestHandler,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { AuthToken } from '../db/entity/AuthToken';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const { status = 500, message = 'Oops, something went wrong!' } = error;
  return res.status(status).json({ status, message });
};

// https://stackoverflow.com/a/51391081/10876256
// This is not a middleware actually.
// But it's a simple wrapper to handle
// async errors with Express.
export const asyncHandler = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export const authenticate: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const authToken = authorizationHeader?.replace('Bearer ', '');
    if (!authToken) {
      return next();
    }
    const viewer = await AuthToken.verifyAndFindUser(authToken);
    req.user = viewer;
    req.authToken = authToken;
    return next();
  },
);
