import { Router } from 'express';
import { IS_PROD } from '../../utils';

const logoutRouter = Router();

const HOME = IS_PROD ? '/' : 'http://localhost:3000';

logoutRouter.get('/', (req, res) => {
  req.logout();
  return res.redirect(HOME);
});

export default logoutRouter;
