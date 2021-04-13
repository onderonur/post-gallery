import { MethodNotAllowedError } from '@api/error-handling/http-errors';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prepareHandler from './prepare-handler.middleware';

interface MethodHandlers {
  GET?: NextApiHandler;
  POST?: NextApiHandler;
  PUT?: NextApiHandler;
  DELETE?: NextApiHandler;
  [key: string]: NextApiHandler | undefined;
}

const createHandler = (handlers: MethodHandlers) => (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method) {
    const handler = handlers[req.method];
    if (handler) {
      return prepareHandler(handler)(req, res);
    }
  }
  throw new MethodNotAllowedError();
};

export default createHandler;
