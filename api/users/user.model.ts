import { ID } from '@api/shared/shared.types';
import { Model } from 'objection';
import { Maybe } from 'graphql/jsutils/Maybe';
import { BaseModel } from '@api/db/base.model';
import { AuthTokenModel } from '@api/auth/authtoken.model';
import { PostModel } from '@api/posts/post.model';
import { MediaModel } from '@api/media/media.model';
import { ReactionModel } from '@api/reactions/reaction.model';
import { CommentModel } from '@api/comments/comment.model';

export class UserModel extends BaseModel {
  googleProfileId: Maybe<ID>;
  facebookProfileId: Maybe<ID>;
  displayName: string;
  email: string;
  thumbnailUrl: Maybe<string>;

  authTokens?: AuthTokenModel[];
  posts?: PostModel[];
  medias?: MediaModel[];
  reactions?: ReactionModel[];
  comments?: CommentModel[];

  static tableName = 'User';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['displayName', 'email'],
      properties: {
        displayName: { type: 'string', minLength: 3, maxLength: 50 },
        email: { type: 'string', minLength: 3, maxLength: 320 },
      },
    };
  }

  static relationMappings = () => ({
    authTokens: {
      relation: Model.HasManyRelation,
      modelClass: AuthTokenModel,
      join: {
        from: 'User.id',
        to: 'AuthToken.userId',
      },
    },
    posts: {
      relation: Model.HasManyRelation,
      modelClass: PostModel,
      join: {
        from: 'User.id',
        to: 'Post.userId',
      },
    },
    medias: {
      relation: Model.HasManyRelation,
      modelClass: MediaModel,
      join: {
        from: 'User.id',
        to: 'Media.userId',
      },
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: CommentModel,
      join: {
        from: 'User.id',
        to: 'Comment.userId',
      },
    },
    reactions: {
      relation: Model.HasManyRelation,
      modelClass: ReactionModel,
      join: {
        from: 'User.id',
        to: 'Reaction.userId',
      },
    },
  });
}
