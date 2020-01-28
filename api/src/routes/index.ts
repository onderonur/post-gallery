import { Router } from 'express';
import authRouter from './auth';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;
