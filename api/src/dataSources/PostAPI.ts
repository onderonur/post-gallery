import { DataSource } from 'apollo-datasource';
import { Post } from '../entity/Post';
import { ID } from '../types';
import { CreatePostInput, QueryPostsArgs } from '../generated/graphql';
import { findAndGetConnection } from './utils';
import { LessThan } from 'typeorm';

const getPostCursor = (post: Post) => {
  return post.createdAt.toISOString();
};

class PostAPI extends DataSource {
  private Post = Post;

  getPostConnection = async ({ first, after }: QueryPostsArgs) => {
    const connection = await findAndGetConnection(this.Post, {
      first,
      order: { createdAt: 'DESC' },
      where: {
        createdAt: after ? LessThan(after) : undefined,
      },
      getCursorFn: getPostCursor,
    });
    return connection;
  };

  getPostById = async (id: ID) => {
    const post = await this.Post.findOne(id);
    return post || null;
  };

  createPost = async ({ title }: CreatePostInput) => {
    const post = new Post();
    post.title = title;
    await this.Post.save(post);
    return post;
  };

  deletePost = async (id: ID) => {
    const { affected } = await this.Post.delete(id);
    if (affected) {
      return true;
    }

    return false;
  };
}

export default PostAPI;
