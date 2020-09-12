import Tokens from 'csrf';
import { NextApiMiddleware } from './types';
import { RequestHeader } from '@shared/RequestHeader';
import { UnauthorizedError } from '@api/utils/httpErrors';

const ignoredMethods = ['GET', 'HEAD', 'OPTIONS'];
const errorMessage = 'Invalid csrf token';

const csrfProtection: NextApiMiddleware = (fn) => async (req, res) => {
  if (ignoredMethods.includes(req.method as string)) {
    return fn(req, res);
  }
  const _csrf = req.cookies._csrf;
  const csrfToken = req.headers[RequestHeader.CSRF_TOKEN];
  if (!_csrf || typeof csrfToken !== 'string') {
    throw new UnauthorizedError(errorMessage);
  }
  const tokens = new Tokens();
  const verified = tokens.verify(_csrf, csrfToken);
  if (!verified) {
    throw new UnauthorizedError(errorMessage);
  }
  return fn(req, res);
};

export default csrfProtection;
