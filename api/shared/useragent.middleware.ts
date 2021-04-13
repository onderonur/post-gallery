import { NextApiRequest } from 'next';
import expressUseragent from 'express-useragent';
import { Maybe } from '@api/generated/graphql';
import { NextApiMiddleware } from '@api/shared/shared.types';

declare module 'next' {
  interface NextApiRequest {
    useragent?: Maybe<expressUseragent.Details>;
  }
}

const useragent: NextApiMiddleware = (fn) => async (req, res) => {
  const header = req.headers['user-agent'];
  let parsedUseragent: NextApiRequest['useragent'];
  if (header) {
    parsedUseragent = expressUseragent.parse(header);
  }
  req.useragent = parsedUseragent;
  return fn(req, res);
};

export default useragent;
