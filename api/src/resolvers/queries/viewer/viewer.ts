import { QueryResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';
import { AuthenticationError } from 'apollo-server-express';

export const viewer: QueryResolvers<GQLContext>['viewer'] = (
  parent,
  args,
  { user },
) => {
  if (!user) {
    throw new AuthenticationError('invalid_credentials');
  }
  return user;
};
