import { Router } from 'express';
import googleRouter from './google';
import logoutRouter from './logout';
import facebookRouter from './facebook';

const authRouter = Router();

authRouter.use('/google', googleRouter);
authRouter.use('/facebook', facebookRouter);
authRouter.use('/logout', logoutRouter);

export default authRouter;
