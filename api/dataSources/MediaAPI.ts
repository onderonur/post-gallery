import { ID } from '../types';
import BaseDataSource from './BaseDataSource';

class MediaAPI extends BaseDataSource {
  async findOneById(id: ID) {
    const { db } = this.context;
    const media = await db.media.findOneById(id);
    return media;
  }

  async findOneMediaByPostId(postId: ID) {
    const { db } = this.context;
    const media = await db.media.findOneByPostId(postId);
    return media;
  }
}

export default MediaAPI;
