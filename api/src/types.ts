import { Scalars, Maybe, PageInfo } from './generated/graphql';
import { DataSources } from './dataSources';
import { Loaders } from './loaders';
import { User } from './db/entity/User';
import { Post } from './db/entity/Post';
import { Comment } from './db/entity/Comment';

// Overriding the default process.env type to have type-safe env variables.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      DATABASE: string;
      DATABASE_TYPE: string;
      DATABASE_HOST: string;
      DATABASE_PORT: number;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      MAX_FILE_SIZE_IN_MB: number;
      MAX_FILES_COUNT: number;
      STORAGE_DIR: string;
      CLIENT_BUILD_PATH: string;
      GOOGLE_OAUTH_CLIENT_ID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
      AUTH_TOKEN_SECRET: string;
    }
  }

  namespace Express {
    interface Request {
      user: Maybe<RequestUser>;
      authToken: Maybe<string>;
    }
  }
}

export type ID = Scalars['ID'];
export type Cursor = Scalars['Cursor'];

export type RequestUser = User;

export interface ConnectionOptions {
  first?: Maybe<number>;
  after?: Cursor;
}

export interface Connection<T> {
  totalCount: number;
  pageInfo: PageInfo;
  edges: { cursor: Cursor; node: T }[];
}

// GraphQL Context type which passed to the Codegen.
// It insert this type to each resolver automatically.
export interface GQLContext {
  viewer: Maybe<RequestUser>;
  authToken: Maybe<string>;
  dataSources: DataSources;
  loaders: Loaders;
}

// Types to use in Codegen mappers
export type PostModel = Pick<Post, 'id' | 'title' | 'createdAt' | 'userId'>;
export type CommentModel = Pick<
  Comment,
  'id' | 'text' | 'createdAt' | 'userId'
>;
export type UserModel = Pick<
  User,
  'id' | 'displayName' | 'email' | 'thumbnailUrl'
>;
