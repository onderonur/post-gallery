import { RequestHandler, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const { status = 500, message = 'Oops, something went wrong!' } = error;
  return res.status(status).json({ status, message });
};

// About using csrf tokens with csurf;
// https://stackoverflow.com/questions/59606019/express-js-csurf-cookie-and-header-match-returning-403/59607800#59607800
// https://stackoverflow.com/questions/59547873/how-to-secure-my-react-app-api-with-csurf/59549909#59549909
export const passCsrfTokenToClient: RequestHandler = (req, res, next) => {
  res.cookie('csrfToken', req.csrfToken());
  return next();
};
