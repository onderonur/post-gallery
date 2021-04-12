import { AddPostCommentInput } from '@api/generated/graphql';
import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import { ID } from '@api/shared/shared.types';
import { GraphConnectionArgs } from '../shared/shared.types';
import BaseRepository from './utils/BaseRepository';
import { createLoader } from './utils/createLoader';
import { CommentModel, ReactableType } from './knex';
import { findGraphConnection } from './utils/findGraphConnection';
import { generateId } from './utils/generateId';

export type CommentGraphConnectionArgs = GraphConnectionArgs & {
  postId: ID;
};

interface CommentsCountByPostId {
  postId: ID;
  count: number;
}

const createCommentByIdLoader = createLoader<ID, CommentModel>(
  (commentIds) => CommentModel.query().findByIds(commentIds as ID[]),
  (comment) => comment.id,
);

const createCommentsCountByPostIdLoader = createLoader<
  ID,
  CommentsCountByPostId
>(
  async (postIds) => {
    const commentCounts = await CommentModel.knexQuery()
      .select('postId')
      .count('*')
      .whereIn('postId', postIds as ID[])
      .groupBy<CommentsCountByPostId[]>('postId');
    return commentCounts;
  },
  (commentCountsByPostId) => commentCountsByPostId.postId,
);

const commentLoaders = () => ({
  commentById: createCommentByIdLoader(),
  commentsCountByPostId: createCommentsCountByPostIdLoader(),
});

class CommentRepository extends BaseRepository {
  private loaders = commentLoaders();

  async countByPostId(postId: ID) {
    const result = await this.loaders.commentsCountByPostId.load(postId);
    return result?.count ?? 0;
  }

  async findOneById(id: ID) {
    const comment = await this.loaders.commentById.load(id);
    return comment;
  }

  getCursor(comment: CommentModel) {
    return comment.id;
  }

  async create({ text, postId }: AddPostCommentInput) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }
    const commentId = generateId();
    const comment = await CommentModel.query().insertGraph({
      id: commentId,
      text,
      postId,
      userId: viewer.id,
      reactable: {
        // We make reactable's id same with the comment's id
        // to be able to reference it easily.
        // May change this method later.
        id: commentId,
        type: ReactableType.COMMENT,
      },
    });
    // Returning the created comment edge
    return { cursor: this.getCursor(comment), node: comment };
  }

  async deleteById(commentId: ID) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }
    const comment = await this.findOneById(commentId);
    if (!comment) {
      throw new ApolloError('Comment not found');
    }
    if (comment.userId !== viewer.id) {
      throw new ApolloError("You can not delete another user's comment");
    }
    const deletedNum = await comment.$query().delete();
    return !!deletedNum;
  }

  async findConnection(args: CommentGraphConnectionArgs) {
    const { first, after, postId } = args;
    const connection = findGraphConnection({
      after,
      first,
      getCursorFn: this.getCursor,
      orderBy: 'createdAt',
      tableName: CommentModel.tableName,
      where: (query) => {
        if (postId) {
          query.where({ postId });
        }
      },
    });
    return connection;
  }
}

export default CommentRepository;
