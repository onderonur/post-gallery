import { ID } from '../shared/shared.types';
import BaseDataSource from '../shared/base.datasource';

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
