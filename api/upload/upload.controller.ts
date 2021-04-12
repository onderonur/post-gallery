import { NextApiHandler } from 'next';
import { UserInputError } from 'apollo-server-micro';
import { nanoid } from 'nanoid';
import { ImageOptions, uploadFile } from './file-system.utils';
import { GraphMedia } from '@api/generated/graphql';

// Order of these configs matters.
// Results of "Promise.all" in the "MediaAPI.uploadSingleMedia"
// relies of this.
const imageOptions: ImageOptions[] = [
  {
    suffix: 'thumbnail',
    width: 150,
    height: 150,
  },
  {
    suffix: 'small',
    width: 320,
  },
  {
    width: 640,
  },
];

const uploadMedia: NextApiHandler<GraphMedia> = async (req, res) => {
  const { file } = req;
  if (!file) {
    throw new UserInputError('No uploaded file can be found in request');
  }
  const fileId = nanoid();
  const promises = imageOptions.map((options) =>
    uploadFile(file, fileId, options),
  );
  const [thumbnail, smallImage, standardImage] = await Promise.all(promises);
  const { db } = req;
  const media = await db.media.create({
    thumbnail,
    smallImage,
    standardImage,
  });
  return res.json(media);
};

const uploadController = {
  uploadMedia,
};

export default uploadController;
