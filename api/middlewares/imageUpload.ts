import multer from 'multer';
import runMiddleware from '@api/middlewares/runMiddleware';
import { Maybe } from '@api/generated/graphql';
import path from 'path';
import { NextApiMiddleware } from './types';
import { convertMbToBytes } from '@api/utils/convertMbToBytes';

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
    fileSize: convertMbToBytes(process.env.MAX_FILE_SIZE_IN_MB),
  },
  // https://stackoverflow.com/a/60408823/10876256
  fileFilter: (req, file, cb) => {
    try {
      isImageFile(file);
      return cb(null, true);
    } catch (err) {
      return cb(err);
    }
  },
});

const imageUpload: NextApiMiddleware = (fn) => async (req, res) => {
  await runMiddleware(req, res, upload.single('image'));
  return fn(req, res);
};

export default imageUpload;
