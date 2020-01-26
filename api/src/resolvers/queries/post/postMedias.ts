import { PostResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const postMedias: PostResolvers<GQLContext>['postMedias'] = (
  { id },
  args,
  { loaders },
) => loaders.postMediaByPostIdLoader.load(id);
