import { isDev } from '@shared/isDev';
import { GraphQLError } from 'graphql';

const dbClient = 'postgres';
const maskedMessage = 'Something went wrong';

// We are masking database errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const maskSensitiveInfoFromError = (err: any) => {
  // Not masking db errors in development mode
  if (isDev()) {
    return err;
  } else if (
    (err instanceof GraphQLError &&
      err.extensions?.exception?.client === dbClient) ||
    err.client === dbClient
  ) {
    return new Error(maskedMessage);
  }
  return err;
};
