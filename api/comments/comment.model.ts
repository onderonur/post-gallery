import { ID, ObjectionModelToPojo } from '@api/shared/shared.types';
import { Model, ModelOptions, Pojo } from 'objection';
import { BaseModel } from '@api/db/base.model';
import { UserModel } from '@api/users/user.model';
import { PostModel } from '@api/posts/post.model';
import { ReactableModel } from '@api/reactions/reaction.model';

export class CommentModel extends BaseModel {
  text: string;

  userId: ID;
  user: UserModel;
  postId: ID;
  post: PostModel;
  reactable: ReactableModel;

  static tableName = 'Comment';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'userId', 'postId'],
      properties: {
        text: { type: 'string', minLength: 1, maxLength: 1000 },
      },
    };
  }

  $parseJson(json: Pojo, opt: ModelOptions) {
    const parsed = super.$parseJson(
      json,
      opt,
    ) as ObjectionModelToPojo<CommentModel>;
    if (typeof parsed.text === 'string') {
      parsed.text = parsed.text.trim();
    }
    return parsed;
  }

  static relationMappings = () => ({
    reactable: {
      relation: Model.HasOneRelation,
      modelClass: ReactableModel,
      join: {
        from: 'Comment.id',
        to: 'Reactable.commentId',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'Comment.userId',
        to: 'User.id',
      },
    },
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: PostModel,
      join: {
        from: 'Comment.postId',
        to: 'Post.id',
      },
    },
  });
}
