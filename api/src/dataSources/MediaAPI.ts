import { DataSource } from 'apollo-datasource';
import { FileUpload } from 'graphql-upload';
import fileSystem, { ImageOptions } from './utils/fileSystem';
import { Media } from '../entity/Media';
import nanoid from 'nanoid';
import { MediaOwner } from '../generated/graphql';

// Order of these configs matters.
// Results of "Promise.all" in the "MediaAPI.uploadSingle"
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

class MediaAPI extends DataSource {
  uploadSingle = async (file: FileUpload, owner: MediaOwner) => {
    const fileId = nanoid();
    const promises = imageOptions.map(options =>
      fileSystem.uploadFile(file, fileId, options),
    );
    const [thumbnail, small, standard] = await Promise.all(promises);
    const media = new Media();

    media.thumbnailWidth = thumbnail.width;
    media.thumbnailHeight = thumbnail.height;
    media.thumbnailURL = thumbnail.URL;

    media.smallWidth = small.width;
    media.smallHeight = small.height;
    media.smallURL = small.URL;

    media.standardWidth = standard.width;
    media.standardHeight = standard.height;
    media.standardURL = standard.URL;

    media.owner = owner;

    await media.save();

    return media;
  };

  uploadMultiple = async (files: FileUpload[], owner: MediaOwner) => {
    const uploadPromises = files.map(file => this.uploadSingle(file, owner));
    const medias = await Promise.all(uploadPromises);
    return medias;
  };
}

export default MediaAPI;
