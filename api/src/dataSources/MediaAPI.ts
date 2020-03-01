import { FileUpload } from 'graphql-upload';
import fileSystem, { ImageOptions } from './utils/fileSystem';
import { Media } from '../db/entity/Media';
import nanoid from 'nanoid';
import { ID } from '../types';
import BaseDataSource from './BaseDataSource';

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

class MediaAPI extends BaseDataSource {
  async uploadSingleMedia(file: FileUpload) {
    const fileId = nanoid();
    const promises = imageOptions.map(options =>
      fileSystem.uploadFile(file, fileId, options),
    );
    const [thumbnail, small, standard] = await Promise.all(promises);
    const media = new Media();
    media.thumbnail = thumbnail;
    media.smallImage = small;
    media.standardImage = standard;
    await media.save();
    return media;
  }

  async loadMediaByPostId(postId: ID) {
    const { loaders } = this.context;
    const media = await loaders.media.mediaByPostId.load(postId);
    return media;
  }
}

export default MediaAPI;
