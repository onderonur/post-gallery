import multer from 'multer';
import runMiddleware from '@api/shared/run-middleware';
import { Maybe } from '@api/generated/graphql';
import path from 'path';
import { NextApiMiddleware } from '@api/shared/shared.types';
import { convertMbToBytes } from '@api/upload/upload.utils';
import { goTrySync } from 'go-try';

// first we need to disable the default body parser to handle uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();

const isImageFile = (file: Express.Multer.File) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extension = path.extname(file.originalname).toLowerCase();
  const isAllowed = filetypes.test(extension);
  if (isAllowed) {
    return true;
  }
  throw new Error('Only jpeg, jpg, png and gif files are supported');
};

declare module 'next' {
  interface NextApiRequest {
    file?: Maybe<Express.Multer.File>;
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: convertMbToBytes(parseInt(process.env.MAX_FILE_SIZE_IN_MB)),
  },
  // https://stackoverflow.com/a/60408823/10876256
  fileFilter: (req, file, cb) => {
    const result = goTrySync(() => isImageFile(file));
    if (result.error) {
      return cb(result.error);
    }
    return cb(null, true);
  },
});

const imageUpload: NextApiMiddleware = (fn) => async (req, res) => {
  await runMiddleware(req, res, upload.single('image'));
  return fn(req, res);
};

export default imageUpload;
