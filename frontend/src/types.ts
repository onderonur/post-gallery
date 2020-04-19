import { Scalars } from "@/generated/graphql";
import { DataProxy } from "apollo-cache";

export type ID = Scalars["ID"];
export type Cursor = Scalars["Cursor"];

export type CacheProxy = DataProxy;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      GOOGLE_OAUTH_CLIENT_ID: string;
      FACEBOOK_OAUTH_APP_ID: string;
    }
  }
}
