import express, { Router } from 'express';

const uploadsRouter = Router();

// To serve static files under the "file-storage" directory.
uploadsRouter.use('/', express.static(process.env.STORAGE_DIR));

export default uploadsRouter;
