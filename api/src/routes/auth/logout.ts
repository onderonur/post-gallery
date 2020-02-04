import { Router } from 'express';

const logoutRouter = Router();

const IS_PROD = process.env.NODE_ENV === 'production';
const HOME = IS_PROD ? '/' : 'http://localhost:3000';

logoutRouter.get('/', (req, res) => {
  req.logout();
  return res.redirect(HOME);
});

export default logoutRouter;
