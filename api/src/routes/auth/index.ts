import { Router } from 'express';
import googleRouter from './google';

const authRouter = Router();

authRouter.use('/google', googleRouter);

export default authRouter;
