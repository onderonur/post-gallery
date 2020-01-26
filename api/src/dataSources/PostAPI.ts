import { DataSource } from 'apollo-datasource';
import { Post } from '../entity/Post';
import { ID } from '../types';
import { QueryPostsArgs } from '../generated/graphql';
import { findAndGetConnection } from './utils';
import { LessThan, FindConditions } from 'typeorm';
import { Media } from '../entity/Media';
import { PostMedia } from '../entity/PostMedia';

const getPostCursor = (post: Post) => {
  return post.createdAt.toISOString();
};

interface CreatePostArgs {
  title: string;
  medias: Media[];
}

class PostAPI extends DataSource {
  getPostConnection = async ({ first, after }: QueryPostsArgs) => {
    const where: FindConditions<Post> = {};
    if (after) {
      where.createdAt = LessThan(after);
    }

    const connection = await findAndGetConnection(Post, {
      first,
      order: { createdAt: 'DESC' },
      where,
      getCursorFn: getPostCursor,
    });
    return connection;
  };

  getPostById = async (id: ID) => {
    const post = await Post.findOne(id);
    return post || null;
  };

  createPost = async ({ title, medias }: CreatePostArgs) => {
    const post = new Post();
    post.title = title;

    const postMedias = medias.map(media => {
      const postMedia = new PostMedia();
      postMedia.media = media;
      return postMedia;
    });
    post.postMedias = postMedias;

    await post.save();

    return post;
  };

  deletePost = async (id: ID) => {
    const { affected } = await Post.delete(id);
    if (affected) {
      return true;
    }

    return false;
  };
}

export default PostAPI;
