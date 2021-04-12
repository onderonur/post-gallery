import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import handleErrors from '../error-handling/handle-errors.middleware';
import useragent from './useragent.middleware';
import authenticate from '../auth/authenticate.middleware';
import withDb from '../db/with-db.middleware';
import { NextApiMiddleware } from '@api/shared/shared.types';
import csrfProtection from '../auth/csrf-protection.middleware';
import rateLimiter from './rate-limiter.middleware';

// https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
const pipe = (...fns: NextApiMiddleware[]) => (x: NextApiHandler) =>
  fns
    // We want our middlewares to work from outside to inside.
    // So, we reverse the array.
    .reverse()
    .reduce((acc, curr) => curr(acc), x);

const prepareHandler = (fn: NextApiHandler) => (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  return pipe(
    handleErrors,
    useragent,
    rateLimiter,
    withDb,
    csrfProtection,
    authenticate,
  )(fn)(req, res);
};

export default prepareHandler;
