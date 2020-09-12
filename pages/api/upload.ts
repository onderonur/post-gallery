import { NextApiHandler } from 'next';
import uploadController from '@api/controllers/uploadController';
import imageUpload, { config } from '@api/middlewares/imageUpload';
import createHandler from '@api/middlewares/createHandler';

export { config };

const uploadHandler: NextApiHandler = createHandler({
  POST: imageUpload(uploadController.uploadMedia),
});

export default uploadHandler;
