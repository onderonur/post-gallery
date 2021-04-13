import { NextApiHandler } from 'next';
import uploadController from '@api/upload/upload.controller';
import imageUpload, { config } from '@api/upload/image-upload.middleware';
import createHandler from '@api/shared/create-handler.middleware';

export { config };

const uploadHandler: NextApiHandler = createHandler({
  POST: imageUpload(uploadController.uploadMedia),
});

export default uploadHandler;
