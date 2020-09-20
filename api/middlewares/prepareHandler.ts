import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import handleErrors from './handleErrors';
import useragent from './useragent';
import authenticate from './authenticate';
import withDb from './withDb';
import { NextApiMiddleware } from './types';
import csrfProtection from './csrfProtection';
import rateLimiter from './rateLimiter';

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
