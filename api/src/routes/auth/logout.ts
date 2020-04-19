import { Router } from 'express';
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { AuthToken } from '../../db/entity/AuthToken';

const logoutRouter = Router();

logoutRouter.post('/', async (req, res) => {
  const { user, authToken } = req;
  if (!user || !authToken) {
    throw new AuthenticationError('invalid_credentials');
  }
  const decodedToken = jwt.decode(authToken);
  const { jti } = decodedToken as any;
  await AuthToken.deleteByJti(jti);
  return res.json({ success: true });
});

export default logoutRouter;
