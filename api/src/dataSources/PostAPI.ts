import { DataSource } from 'apollo-datasource';
import { Post } from '../entity/Post';
import { ID, Edge } from '../types';
import { getLastOfArray } from '../utils';
import { CreatePostInput } from '../generated/graphql';

const getPostCursor = (post: Post) => {
  return post.createdAt.toISOString();
};

const createEdges = <T>(
  array: T[],
  getCursor: (item: T) => string,
): Edge<T>[] => {
  const edges = array.map(item => ({ node: item, cursor: getCursor(item) }));
  return edges;
};

const getEndCursor = <T>(edges: Edge<T>[]) => {
  const lastEdge = getLastOfArray(edges);
  if (lastEdge) {
    return lastEdge.cursor;
  }

  return null;
};

class PostAPI extends DataSource {
  private Post = Post;

  getPostConnection = async () => {
    const [posts, totalCount] = await this.Post.findAndCount({
      order: { createdAt: 'DESC' },
    });
    const edges = createEdges(posts, post => getPostCursor(post));
    const connection = {
      totalCount,
      edges,
      pageInfo: {
        hasNextPage: false,
        endCursor: getEndCursor(edges),
      },
    };
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
