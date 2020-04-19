import { Router } from 'express';
import googleRouter from './google';
import logoutRouter from './logout';

const authRouter = Router();

authRouter.use('/google', googleRouter);
authRouter.use('/logout', logoutRouter);

export default authRouter;
