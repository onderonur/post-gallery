import { ID, ObjectionModelToPojo } from '@api/shared/shared.types';
import { Model, ModelOptions, Pojo } from 'objection';
import { BaseModel } from '@api/db/base.model';
import { CategoryModel } from '@api/categories/category.model';
import { UserModel } from '@api/users/user.model';
import { MediaModel } from '@api/media/media.model';
import { ReactableModel } from '@api/reactions/reaction.model';

export class PostModel extends BaseModel {
  title: string;

  categoryId: ID;
  category?: CategoryModel;
  userId: ID;
  user?: UserModel;
  media?: MediaModel;
  reactable?: ReactableModel;

  static tableName = 'Post';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'categoryId', 'userId'],
      properties: {
        title: { type: 'string', minLength: 5, maxLength: 200 },
      },
    };
  }

  // To mutate data before running validations, we use $parseJson
  // https://vincit.github.io/objection.js/api/model/instance-methods.html#parsejson
  $parseJson(json: Pojo, opt: ModelOptions) {
    // Remember to call the super class's implementation.
    const parsed = super.$parseJson(
      json,
      opt,
    ) as ObjectionModelToPojo<PostModel>;
    // Do your conversion here.
    // If we don't do it like this and linking relations between models
    // with "upsertGraph" vs, "title" will be "undefined" and this will
    // throw an error. So, we check if there is a title.
    if (typeof parsed.title === 'string') {
      parsed.title = parsed.title.trim();
    }
    return parsed;
  }

  static relationMappings = () => ({
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: CategoryModel,
      join: {
        from: 'Post.categoryId',
        to: 'Category.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'Post.userId',
        to: 'User.id',
      },
    },
    media: {
      relation: Model.HasOneRelation,
      modelClass: MediaModel,
      join: {
        from: 'Post.id',
        to: 'Media.postId',
      },
    },
    reactable: {
      relation: Model.HasOneRelation,
      modelClass: ReactableModel,
      join: {
        from: 'Post.id',
        to: 'Reactable.postId',
      },
    },
  });
}
