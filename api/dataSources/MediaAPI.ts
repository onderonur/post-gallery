import { ID } from '../types';
import BaseDataSource from './BaseDataSource';

class MediaAPI extends BaseDataSource {
  async findMediaByPostId(postId: ID) {
    const { db } = this.context;
    const media = await db.media.findOneByPostId(postId);
    return media;
  }
}

export default MediaAPI;
