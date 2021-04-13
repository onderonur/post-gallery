import { ID } from '@api/shared/shared.types';
import { Model } from 'objection';
import { BaseModel } from '@api/db/base.model';
import { PostModel } from '@api/posts/post.model';
import { UserModel } from '@api/users/user.model';

export class MediaModel extends BaseModel {
  postId?: ID;
  post?: PostModel;
  userId: ID;
  user: UserModel;
  thumbnailWidth: number;
  thumbnailHeight: number;
  thumbnailUrl: string;
  smallImageWidth: number;
  smallImageHeight: number;
  smallImageUrl: string;
  standardImageWidth: number;
  standardImageHeight: number;
  standardImageUrl: string;

  static tableName = 'Media';

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'userId',
        'thumbnailWidth',
        'thumbnailHeight',
        'thumbnailUrl',
        'smallImageWidth',
        'smallImageHeight',
        'smallImageUrl',
        'standardImageWidth',
        'standardImageHeight',
        'standardImageUrl',
      ],
    };
  }

  static relationMappings = () => ({
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: PostModel,
      join: {
        from: 'Media.postId',
        to: 'Post.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'Media.userId',
        to: 'User.id',
      },
    },
  });
}
