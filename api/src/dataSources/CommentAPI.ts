import BaseDataSource from './BaseDataSource';
import { ID } from '../types';
import { Comment } from '../db/entity/Comment';
import { AddPostCommentInput, PostCommentsArgs } from '../generated/graphql';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { emptyConnection } from '../db/entity/utils/connection';
import { Reactable, ReactableType } from '../db/entity/Reactable';

class CommentAPI extends BaseDataSource {
  async addPostComment({ postId, text }: AddPostCommentInput) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('invalid_credentials');
    }
    const userId = viewer.id;
    const comment = new Comment();
    comment.text = text;
    comment.postId = postId;
    comment.userId = userId;
    const reactable = new Reactable();
    reactable.type = ReactableType.Comment;
    comment.reactable = reactable;
    await comment.save();
    // Returning the created comment edge
    return { cursor: Comment.getCursor(comment), node: comment };
  }

  async removePostComment(id: ID) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('invalid_credentials');
    }
    const comment = await Comment.findOne(id);
    if (!comment) {
      throw new ApolloError('We can not find the comment you are looking for');
    }
    if (comment.userId !== viewer.id) {
      throw new ApolloError("You can not delete another user's comment");
    }
    // "affected" is the number of deleted rows.
    // If we only delete the "comment", its parent "reactable" will still be
    // in the db. So, we just delete the "reactable" itself and  delete
    // comment with "onDelete: CASCADE"
    const deleted = await comment.remove();
    return !deleted.id;
  }

  async findCommentConnectionByPostId(
    postId: ID,
    { first, after }: PostCommentsArgs,
  ) {
    const { loaders } = this.context;
    const result = await loaders.comment.commentConnectionByPostId.load({
      postId,
      first,
      after,
    });
    return result?.connection || emptyConnection;
  }
}

export default CommentAPI;
