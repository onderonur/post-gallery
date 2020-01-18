import { QueryResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const post: QueryResolvers<GQLContext>['post'] = (
  parent,
  { id },
  { dataSources },
) => dataSources.postAPI.getPostById(id);
