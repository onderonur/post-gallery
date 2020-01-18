import fs from 'fs';
import path from 'path';
import nanoid from 'nanoid';
import sharp from 'sharp';
import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

// TODO: There may be a "cron" job to run daily/weekly to clear images of the deleted "samples".

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

const saveStreamToPath = (stream: NodeJS.ReadableStream, filepath: string) => {
  // Or without using "sharp":
  // stream.pipe(fs.createWriteStream(filepath));
  // return new Promise(resolve => {
  //   stream.on("end", () => {
  //     resolve();
  //   });
  // });

  const writer = sharp();
  writer.toFile(filepath);
  const info = stream.pipe(writer);
  return info;
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

// A good example: https://github.com/withspectrum/spectrum/blob/alpha/api/utils/file-system.js
class FileStorageAPI extends DataSource {
  uploadSingle = async (file: FileUpload) => {
    // Checking if the "upload" directory exists.
    // If not, we create it.
    await createStorageIfNotExists();
    const result = await file;
    const { createReadStream, filename, mimetype } = result;
    const isAllowed = isAllowedMimeType(mimetype);
    if (!isAllowed) {
      throw new UserInputError(
        `Files with "${mimetype}" type are not allowed. Please use another type of file.`,
      );
    }
    const fileId = nanoid();
    const extension = path.extname(filename);
    const filepath = `${STORAGE_DIR}/${fileId}${extension}`;
    const stream = createReadStream();
    saveStreamToPath(stream, filepath);
    return filepath;
  };

  uploadMultiple = async (files: FileUpload[]) => {
    const uploadPromises = files.map(file => this.uploadSingle(file));
    const filePaths = await Promise.all(uploadPromises);
    return filePaths;
  };
}

export default FileStorageAPI;
