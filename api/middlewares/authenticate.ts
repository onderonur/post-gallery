import { Maybe } from '@api/generated/graphql';
import { extractAuthToken, destroyAuthTokenCookie } from '@api/utils/auth';
import { Viewer, DecodedJwt } from '../types';
import { NextApiMiddleware } from './types';

declare module 'next' {
  interface NextApiRequest {
    viewer: Viewer;
    authToken: Maybe<string>;
  }
}

const authenticate: NextApiMiddleware = (fn) => async (req, res) => {
  const authToken = extractAuthToken(req.cookies);
  if (!authToken) {
    return fn(req, res);
  }
  const { db } = req;
  const verified = await db.authToken.verifyAndDecode(authToken);
  if (!verified) {
    // Destroying unverified authToken
    destroyAuthTokenCookie(res);
    return fn(req, res);
  }
  const { sub } = verified as DecodedJwt;
  const viewer = await db.user.findOneById(sub);
  req.viewer = viewer;
  req.authToken = authToken;

  // Injecting viewer and authToken to repositories
  Object.values(db).forEach((repo) => repo.patchContext({ viewer, authToken }));

  return fn(req, res);
};

export default authenticate;
