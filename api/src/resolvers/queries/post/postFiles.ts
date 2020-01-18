import { PostResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const postFiles: PostResolvers<GQLContext>['postFiles'] = (
  { id },
  args,
  { loaders },
) => loaders.postFileByPostIdLoader.load(id);
