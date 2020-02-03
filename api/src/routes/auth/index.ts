import { Router } from 'express';
import googleRouter from './google';

const authRouter = Router();

authRouter.use('/google', googleRouter);

authRouter.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});

export default authRouter;
