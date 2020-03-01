import { Post, PostConnectionOptions } from '../db/entity/Post';
import { ID } from '../types';
import { Media } from '../db/entity/Media';
import BaseDataSource from './BaseDataSource';
import { emptyConnection } from '../db/entity/utils/connection';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { Reactable, ReactableType } from '../db/entity/Reactable';

interface CreatePostArgs {
  title: string;
  media: Media;
}

class PostAPI extends BaseDataSource {
  async findPostConnection(args: PostConnectionOptions) {
    const { loaders } = this.context;
    const result = await loaders.post.postConnection.load(args);
    return result?.connection || emptyConnection;
  }

  async findPostById(id: ID) {
    const post = await Post.findOne(id);
    return post;
  }

  async createPost({ title, media }: CreatePostArgs) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('invalid_credentials');
    }
    const post = new Post();
    post.title = title;
    post.media = media;
    post.userId = viewer.id;
    const reactable = new Reactable();
    reactable.type = ReactableType.Post;
    post.reactable = reactable;
    await post.save();
    return post;
  }

  async deletePost(id: ID) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('invalid_credentials');
    }
    const post = await Post.findOne(id);
    if (!post) {
      throw new ApolloError('We could not find the post you are looking for');
    }
    if (post.userId !== viewer.id) {
      throw new AuthenticationError('invalid_credentials');
    }
    // If we only delete the "post", its parent "reactable" will still be
    // in the db. So, we just delete the "reactable" itself and  delete
    // post with "onDelete: CASCADE"
    const deleted = await post.remove();
    return !deleted.id;
  }
}

export default PostAPI;
