import fs from 'fs';
import nanoid from 'nanoid';
import sharp from 'sharp';
import { UserInputError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

// A good example: https://github.com/withspectrum/spectrum/blob/alpha/api/utils/file-system.js

// TODO: There may be a "cron" job to run daily/weekly to clear images of the deleted "posts".

const DEFAULT_JPG_QUALITY = 70;
const { STORAGE_DIR } = process.env;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

// Promisifying the "fs.access" method which works with callbacks.
// So, we can use "async/await" or "then/catch" with it.
// If there is not an error, result will be "false", so we will know
// the folder is already created. There is no need to "reject" here on error.
// Otherwise, we would need to use "try/catch", when we want to check if a folder exists.
const dirExists = (dirPath: string) =>
  new Promise(resolve =>
    fs.access(dirPath, fs.constants.F_OK, error => resolve(!error)),
  );

// Promisifying the "fs.mkdir" method which works with callbacks.
const createDir = (dirPath: string) =>
  new Promise((resolve, reject) =>
    // About "recursive":
    // https://stackoverflow.com/questions/28498296/enoent-no-such-file-or-directory-on-fs-mkdirsync/53730012#53730012
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fs.mkdir(dirPath, { recursive: true } as any, error => {
      if (error) {
        reject(error);
      }
      resolve();
    }),
  );

const createStorageIfNotExists = async () => {
  const exists = await dirExists(STORAGE_DIR);
  if (!exists) {
    await createDir(STORAGE_DIR);
  }
};

type SaveStreamArgs = {
  stream: ReturnType<FileUpload['createReadStream']>;
  fileOut: string;
};

const saveStreamToPath = (args: SaveStreamArgs): Promise<void> => {
  const { stream, fileOut } = args;
  const pipeline = sharp();
  pipeline.jpeg({ quality: DEFAULT_JPG_QUALITY }).toFile(fileOut);
  return new Promise((resolve, reject) => {
    stream
      .pipe(pipeline)
      .on('finish', () => {
        resolve();
      })
      .on('error', () => {
        reject();
      });
  });
};

// This function can be used to get height/width of an image
// and run some validations.
// const getImageMetadata = stream => {
//   const metaReader = sharp();
//   metaReader.metadata();
//   const metadata = stream.pipe(metaReader);
//   return metadata;
// };

const isAllowedMimeType = (mimetype: string) =>
  ALLOWED_MIME_TYPES.includes(mimetype);

const uploadFile = async (file: FileUpload) => {
  // Checking if the "upload" directory exists.
  // If not, we create it.
  await createStorageIfNotExists();

  const result = await file;
  const { createReadStream, mimetype } = result;

  const isAllowed = isAllowedMimeType(mimetype);
  if (!isAllowed) {
    throw new UserInputError(
      `Files with "${mimetype}" type are not allowed. Please use another type of file.`,
    );
  }

  const fileId = nanoid();
  const fileOut = `${STORAGE_DIR}/${fileId}`;
  const stream = createReadStream();
  await saveStreamToPath({ stream, fileOut });
  return { width: 100, height: 100, URL: fileOut };
};

export default { uploadFile };
