import BaseDataSource from './BaseDataSource';
import { ID } from '../types';
import { AddPostCommentInput, PostCommentsArgs } from '../generated/graphql';

class CommentAPI extends BaseDataSource {
  async addPostComment(input: AddPostCommentInput) {
    const { db } = this.context;
    const commentEdge = await db.comment.create(input);
    return commentEdge;
  }

  async removePostComment(id: ID) {
    const { db } = this.context;
    const comment = await db.comment.deleteById(id);
    return !!comment;
  }

  async findCommentConnectionByPostId(postId: ID, args: PostCommentsArgs) {
    const { db } = this.context;
    const connection = await db.comment.findConnection({
      ...args,
      postId,
    });
    return connection;
  }

  async countCommentsByPostId(postId: ID) {
    const { db } = this.context;
    const count = await db.comment.countByPostId(postId);
    return count;
  }
}

export default CommentAPI;
