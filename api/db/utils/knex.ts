import Knex from 'knex';
import { ID, ObjectionModelToPojo } from '@api/types';
import { Model, ModelOptions, Pojo } from 'objection';
import { ReactionType } from '@api/generated/graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { generateId } from './generateId';

// https://github.com/irustm/koa-knex-typescript-example/blob/master/src/server/db/connection.ts
const config = require('../../../knexfile').development;

const knex = Knex(config);

Model.knex(knex);

class BaseModel extends Model {
  id: ID;
  createdAt: Date;
  updatedAt: Date;

  // https://github.com/Vincit/objection.js/issues/46#issuecomment-496481331
  $beforeInsert() {
    if (!this.id) {
      this.id = generateId();
    }
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    // We don't want id to be updated
    // Or we can accidentally update the id with "patch"
    // @ts-ignore
    // delete this.id;
    this.updatedAt = new Date();
  }
}

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

export class UserModel extends BaseModel {
  googleProfileId: Maybe<ID>;
  facebookProfileId: Maybe<ID>;
  displayName: string;
  email: string;
  thumbnailUrl?: Maybe<string>;

  authTokens?: AuthTokenModel[];
  posts?: PostModel[];
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
    const parsed = super.$parseJson(json, opt) as ObjectionModelToPojo<
      CommentModel
    >;
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

export class CategoryModel extends BaseModel {
  name: string;
  slug: string;
  order: number;

  posts?: PostModel[];

  static tableName = 'Category';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug', 'order'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 100 },
        slug: { type: 'string', minLength: 1, maxLength: 100 },
      },
    };
  }

  $parseJson(json: Pojo, opt: ModelOptions) {
    const parsed = super.$parseJson(json, opt) as ObjectionModelToPojo<
      CategoryModel
    >;
    if (typeof parsed.name === 'string') {
      parsed.name = parsed.name.trim();
    }
    if (typeof parsed.slug === 'string') {
      parsed.slug = parsed.slug.trim();
    }
    return parsed;
  }

  static relationMappings = () => ({
    posts: {
      relation: Model.HasManyRelation,
      modelClass: PostModel,
      join: {
        from: 'Category.id',
        to: 'Post.categoryId',
      },
    },
  });
}

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
    const parsed = super.$parseJson(json, opt) as ObjectionModelToPojo<
      PostModel
    >;
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

export class MediaModel extends BaseModel {
  postId?: ID;
  post?: PostModel;
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

  static relationMappings = () => ({
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: PostModel,
      join: {
        from: 'Media.postId',
        to: 'Post.id',
      },
    },
  });
}

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

export default knex;
