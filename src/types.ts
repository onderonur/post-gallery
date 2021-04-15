import { PageInfo, Scalars } from '@src/generated/graphql';
import { FormikConfig } from 'formik';

export type ID = Scalars['ID'];
export type Cursor = Scalars['Cursor'];

// GraphEdge and GraphConnection also might be in "shared",
// but "PageInfo" is coming from "generated".
// We could put shared graph types to be generated in "shared".
// But that would be a little bit too much overkill.
// So, we let these copied on both areas.
// And actually, we have a slight difference between them.
// All properties of there types are optional here.
// Because client might be fetching specific properties.
export interface GraphEdge<T> {
  cursor?: Cursor;
  node?: T;
}

export interface GraphConnection<T> {
  pageInfo?: PageInfo;
  edges?: GraphEdge<T>[];
}

// Overriding the default process.env type to have type-safe env variables.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      STORAGE_DIR: string;
      MAX_FILE_SIZE_IN_MB: string;
      AUTH_TOKEN_SECRET: string;
      NEXT_PUBLIC_FACEBOOK_OAUTH_APP_ID: string;
      NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
    }
  }
}

export type OnSubmitFn<FormValues> = FormikConfig<FormValues>['onSubmit'];

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
