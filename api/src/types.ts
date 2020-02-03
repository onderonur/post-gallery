import { Scalars } from './generated/graphql';
import { DataSources } from './dataSources';
import { Loaders } from './loaders';
import { User } from './entity/User';

export type ID = Scalars['ID'];
export type Cursor = Scalars['Cursor'];

export interface GQLContext {
  user?: Express.User;
  dataSources: DataSources;
  loaders: Loaders;
}

type RequestUser = User;

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
      SESSION_COOKIE_NAME: string;
      SESSION_COOKIE_SECRET: string;
    }
  }

  namespace Express {
    export interface Request {
      user?: RequestUser;
    }
  }
}
