import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-micro';
import { ID } from '@api/types';
import { GraphConnectionArgs } from '../types';
import BaseRepository from './utils/BaseRepository';
import { createLoader } from './utils/createLoader';
import { PostInput, Maybe, Omit } from '@api/generated/graphql';
import { MediaModel, PostModel, ReactableType } from './knex';
import { findGraphConnection } from './utils/findGraphConnection';
import { generateId } from './utils/generateId';

const createPostByIdLoader = createLoader<ID, PostModel>(
  (postIds) => PostModel.query().findByIds(postIds as ID[]),
  (post) => post.id,
);

interface PostsCountByUserId {
  userId: ID;
  count: number;
}

const createPostsCountByUserIdLoader = createLoader<ID, PostsCountByUserId>(
  async (userIds) => {
    const postCounts = await PostModel.knexQuery()
      .select('userId')
      .count('*')
      .whereIn('userId', userIds as ID[])
      .groupBy<PostsCountByUserId[]>('userId');
    return postCounts;
  },
  (postsCount) => postsCount.userId,
);

const postLoaders = () => ({
  postById: createPostByIdLoader(),
  postsCountByUserId: createPostsCountByUserIdLoader(),
});

export type PostGraphConnectionArgs = GraphConnectionArgs & {
  authorId?: Maybe<ID>;
  categoryId?: Maybe<string>;
};

class PostRepository extends BaseRepository {
  private loaders = postLoaders();

  async create(input: Omit<PostInput, 'mediaId'> & { media: MediaModel }) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }
    const { title, categoryId, media } = input;
    if (media.userId !== viewer.id) {
      throw new ForbiddenError("You can not use another user's media");
    }
    const postId = generateId();
    const post = await PostModel.query().upsertGraph(
      {
        id: postId,
        title,
        category: { id: categoryId },
        user: { id: viewer.id },
        media: { id: media.id },
        reactable: {
          // We make reactable's id same with the post's id
          // to be able to reference it easily.
          // May change this method later.
          id: postId,
          type: ReactableType.POST,
        },
      },
      { insertMissing: true, relate: true },
    );
    return post;
  }

  async deleteById(id: ID) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }
    const post = await this.findOneById(id);
    if (!post) {
      throw new ApolloError('Post not found');
    }
    if (post.userId !== viewer.id) {
      throw new AuthenticationError('You are not logged in');
    }
    const deletedNum = await PostModel.query().deleteById(post.id);
    return !!deletedNum;
  }

  async findOneById(id: ID) {
    const post = await this.loaders.postById.load(id);
    return post;
  }

  getCursor(node: PostModel) {
    return node.id;
  }

  async countByUserId(userId: ID) {
    const result = await this.loaders.postsCountByUserId.load(userId);
    return result?.count ?? 0;
  }

  async findConnection(args: PostGraphConnectionArgs) {
    const { first, after, authorId, categoryId } = args;
    const connection = await findGraphConnection({
      after,
      first,
      getCursorFn: this.getCursor,
      orderBy: 'createdAt',
      tableName: PostModel.tableName,
      where: (query) => {
        if (authorId) {
          query.where({ userId: authorId });
        }
        if (categoryId) {
          query.where({ categoryId });
        }
      },
    });
    return connection;
  }
}

export default PostRepository;
