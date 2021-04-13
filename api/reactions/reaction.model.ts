import { ID } from '@api/shared/shared.types';
import { Model } from 'objection';
import { ReactionType } from '@api/generated/graphql';
import { BaseModel } from '@api/db/base.model';
import { PostModel } from '@api/posts/post.model';
import { CommentModel } from '@api/comments/comment.model';
import { UserModel } from '@api/users/user.model';

export enum ReactableType {
  POST = 'POST',
  COMMENT = 'COMMENT',
}

export class ReactableModel extends BaseModel {
  type: ReactableType;

  postId?: ID;
  post?: PostModel;
  commentId?: ID;
  comment?: CommentModel;
  reactions?: ReactableModel[];

  static tableName = 'Reactable';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],
    };
  }

  static relationMappings = () => ({
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: PostModel,
      join: {
        from: 'Reactable.postId',
        to: 'Post.id',
      },
    },
    comment: {
      relation: Model.BelongsToOneRelation,
      modelClass: CommentModel,
      join: {
        from: 'Reactable.commentId',
        to: 'Comment.id',
      },
    },
    reactions: {
      relation: Model.HasManyRelation,
      modelClass: ReactionModel,
      join: {
        from: 'Reactable.id',
        to: 'Reaction.reactableId',
      },
    },
  });
}

export class ReactionModel extends BaseModel {
  type: ReactionType;

  reactableId: ID;
  reactable: ReactableModel;
  userId: ID;
  user: UserModel;

  static tableName = 'Reaction';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type', 'reactableId', 'userId'],
    };
  }

  static relationMappings = () => ({
    reactable: {
      relation: Model.BelongsToOneRelation,
      modelClass: ReactableModel,
      join: {
        from: 'Reaction.reactableId',
        to: 'Reactable.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'Reaction.userId',
        to: 'User.id',
      },
    },
  });
}
