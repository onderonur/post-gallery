import { ErrorRequestHandler, RequestHandler } from 'express';
import { AuthToken } from '../db/entity/AuthToken';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const { status = 500, message = 'Oops, something went wrong!' } = error;
  return res.status(status).json({ status, message });
};

export const authenticate: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const authToken = authorizationHeader?.replace('Bearer ', '');
  if (!authToken) {
    return next();
  }
  const viewer = await AuthToken.verifyAndFindUser(authToken);
  req.user = viewer;
  req.authToken = authToken;
  return next();
};
