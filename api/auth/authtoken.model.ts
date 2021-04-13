import { ID } from '@api/shared/shared.types';
import { Model } from 'objection';
import { Maybe } from 'graphql/jsutils/Maybe';
import { BaseModel } from '@api/db/base.model';
import { UserModel } from '@api/users/user.model';

export class AuthTokenModel extends BaseModel {
  jti: string;
  browser: Maybe<string>;
  platform: Maybe<string>;
  os: Maybe<string>;

  userId: ID;
  user: UserModel;

  static tableName = 'AuthToken';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['jti'],
    };
  }

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'AuthToken.userId',
        to: 'User.id',
      },
    },
  });
}
