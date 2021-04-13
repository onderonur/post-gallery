import { ObjectionModelToPojo } from '@api/shared/shared.types';
import { Model, ModelOptions, Pojo } from 'objection';
import { BaseModel } from '@api/db/base.model';
import { PostModel } from '@api/posts/post.model';

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
    const parsed = super.$parseJson(
      json,
      opt,
    ) as ObjectionModelToPojo<CategoryModel>;
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
