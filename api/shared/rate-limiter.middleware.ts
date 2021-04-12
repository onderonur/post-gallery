import { NextApiMiddleware } from '@api/shared/shared.types';
import rateLimit from 'express-rate-limit';
import runMiddleware from './run-middleware';
import { TooManyRequestsError } from '@api/error-handling/http-errors';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  handler: () => {
    // To be able to format error response body
    // with "handleErrors" middleware
    throw new TooManyRequestsError();
  },
});

const rateLimiter: NextApiMiddleware = (fn) => async (req, res) => {
  await runMiddleware(req, res, limiter);
  return fn(req, res);
};

export default rateLimiter;
