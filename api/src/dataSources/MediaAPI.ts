import { DataSource } from 'apollo-datasource';
import { FileUpload } from 'graphql-upload';
import fileSystem from './utils/fileSystem';
import { Media } from '../entity/Media';

class MediaAPI extends DataSource {
  uploadSingle = async (file: FileUpload) => {
    const result = await fileSystem.uploadFile(file);
    const thumbnail = {
      thumbnailWidth: 100,
      thumbnailHeight: 200,
      thumbnailURL: 'ok ok ok',
    };
    const small = {
      smallWidth: 100,
      smallHeight: 200,
      smallURL: 'ok ok ok',
    };
    const standard = {
      standardWidth: 100,
      standardHeight: 200,
      standardURL: 'ok ok ok',
    };
    const media = await Media.create({
      ...thumbnail,
      ...small,
      ...standard,
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
