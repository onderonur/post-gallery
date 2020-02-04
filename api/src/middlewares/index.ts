import { RequestHandler, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const { status = 500, message = 'Oops, something went wrong!' } = error;
  return res.status(status).json({ status, message });
};

export const passCsrfTokenToClient: RequestHandler = (req, res, next) => {
  res.cookie('csrfToken', req.csrfToken());
  return next();
};
