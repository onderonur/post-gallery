import { DataSource } from 'apollo-datasource';
import { FileUpload } from 'graphql-upload';
import fileSystem, { ImageOptions } from './utils/fileSystem';
import { Media } from '../entity/Media';
import nanoid from 'nanoid';

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
  uploadSingle = async (file: FileUpload) => {
    const fileId = nanoid();
    const promises = imageOptions.map(options =>
      fileSystem.uploadFile(file, fileId, options),
    );
    const [thumbnail, small, standard] = await Promise.all(promises);
    const thumbnailResolution = {
      thumbnailWidth: thumbnail.width,
      thumbnailHeight: thumbnail.height,
      thumbnailURL: thumbnail.URL,
    };
    const smallResolution = {
      smallWidth: small.width,
      smallHeight: small.height,
      smallURL: small.URL,
    };
    const standardResolution = {
      standardWidth: standard.width,
      standardHeight: standard.height,
      standardURL: standard.URL,
    };
    const media = await Media.create({
      ...thumbnailResolution,
      ...smallResolution,
      ...standardResolution,
    }).save();
    return media;
  };

  uploadMultiple = async (files: FileUpload[]) => {
    const uploadPromises = files.map(file => this.uploadSingle(file));
    const medias = await Promise.all(uploadPromises);
    return medias;
  };
}

export default MediaAPI;
