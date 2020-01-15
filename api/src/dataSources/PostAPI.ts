import { DataSource } from 'apollo-datasource';
import { Post } from '../entity/Post';
import { ID } from '../types';
import { getLastOfArray } from '../utils';

interface UploadedFile {
  filename: string;
  filepath: string;
  encoding: string;
  mimetype: string;
}

class PostAPI extends DataSource {
  private Post = Post;

  getPosts = async () => {
    const [posts, totalCount] = await this.Post.findAndCount();
    const lastPost = getLastOfArray(posts);
    const connection = {
      totalCount,
      edges: posts.map(post => ({ node: post, cursor: post.id })),
      pageInfo: {
        hasNextPage: false,
        endCursor: lastPost?.id,
      },
    };
    return connection;
  };

  getPostById = async (id: ID) => {
    const post = await this.Post.findOne(id);
    return post || null;
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
