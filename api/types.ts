import { Scalars, Maybe, PageInfo } from './generated/graphql';
import { DataSources } from './dataSources';
import { NextApiRequest } from 'next';
import {
  CategoryModel,
  CommentModel,
  PostModel,
  UserModel,
} from './db/utils/knex';
import { Model, NonFunctionPropertyNames } from 'objection';

export type ID = Scalars['ID'];
export type Cursor = Scalars['Cursor'];

export type Viewer = Maybe<UserModel>;

export interface GraphConnectionArgs {
  first?: Maybe<number>;
  after?: Cursor;
}

export interface GraphConnection<T> {
  pageInfo: PageInfo;
  edges: { cursor: Cursor; node: T }[];
}

export interface DecodedJwt {
  sub: NonNullable<Viewer>['id'];
  jti: string;
}

// GraphQL Context type which passed to the Codegen.
// It insert this type to each resolver automatically.
export interface GQLContext {
  viewer: Viewer;
  authToken: Maybe<string>;
  dataSources: DataSources;
  db: NextApiRequest['db'];
}

export type ObjectionModelToPojo<T extends Model> = Pick<
  T,
  Exclude<NonFunctionPropertyNames<T>, 'QueryBuilderType'>
>;

// Types to use in Codegen mappers
export type PostMapper = ObjectionModelToPojo<PostModel>;
export type CategoryMapper = ObjectionModelToPojo<CategoryModel>;
export type CommentMapper = ObjectionModelToPojo<CommentModel>;
export type UserMapper = ObjectionModelToPojo<UserModel>;
