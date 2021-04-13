import { promises as fs, constants as fsConstants } from 'fs';
import { goTry } from 'go-try';
import sharp from 'sharp';

// A good example: https://github.com/withspectrum/spectrum/blob/alpha/api/utils/file-system.js

// TODO: There may be a "cron" job to run daily/weekly to clear images of the deleted "posts".

const defaultJpgQuality = 70;
const STORAGE_DIR = process.env.STORAGE_DIR;

const dirExists = async (dirPath: string) => {
  const { error } = await goTry(() => fs.access(dirPath, fsConstants.F_OK));
  return !error;
};

const createDir = async (dirPath: string) => {
  // About "recursive":
  // https://stackoverflow.com/questions/28498296/enoent-no-such-file-or-directory-on-fs-mkdirsync/53730012#53730012
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await fs.mkdir(dirPath, { recursive: true } as any);
};

export const createStorageIfNotExists = async () => {
  const exists = await dirExists(STORAGE_DIR);
  if (!exists) {
    await createDir(STORAGE_DIR);
  }
};

export interface ImageOptions {
  suffix?: string;
  width: number;
  height?: number;
}

export const uploadFile = async (
  file: Express.Multer.File,
  fileId: string,
  options?: ImageOptions,
) => {
  // Checking if the "upload" directory exists.
  // If not, we create it.
  await createStorageIfNotExists();

  const extension = '.jpg';
  let fileOut = `${STORAGE_DIR}/${fileId}${extension}`;

  const suffix = options?.suffix;
  if (suffix) {
    fileOut = fileOut.replace(extension, `_${suffix}${extension}`);
  }

  const info = await sharp(file.buffer)
    .jpeg({ quality: defaultJpgQuality })
    .resize(options?.width, options?.height)
    .toFile(fileOut);

  return { ...info, url: `/${fileOut}` };
};
