import { Router } from 'express';
import authRouter from './auth';
import uploadsRouter from './uploads';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/uploads', uploadsRouter);

export default rootRouter;
