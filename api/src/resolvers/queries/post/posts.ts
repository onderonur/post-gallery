import { QueryResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const posts: QueryResolvers<GQLContext>['posts'] = (
  parent,
  args,
  { dataSources },
) => dataSources.postAPI.getPostConnection(args);
