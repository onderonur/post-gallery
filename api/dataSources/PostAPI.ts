import { ID } from '../types';
import BaseDataSource from './BaseDataSource';
import { PostGraphConnectionArgs } from '@api/db/post';
import { PostInput } from '@api/generated/graphql';

class PostAPI extends BaseDataSource {
  async findPostConnection(args: PostGraphConnectionArgs) {
    const { db } = this.context;
    const connection = await db.post.findConnection(args);
    return connection;
  }

  async findPostById(id: ID) {
    const { db } = this.context;
    const post = await db.post.findOneById(id);
    return post;
  }

  async createPost(input: PostInput) {
    const { db } = this.context;
    const post = await db.post.create(input);
    return post;
  }

  async deletePost(id: ID) {
    const { db } = this.context;
    const isDeleted = await db.post.deleteById(id);
    return isDeleted;
  }

  async countPostsByUserId(userId: ID) {
    const { db } = this.context;
    const postsCount = await db.post.countByUserId(userId);
    return postsCount;
  }
}

export default PostAPI;
