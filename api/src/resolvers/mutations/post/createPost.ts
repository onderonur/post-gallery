import { MutationResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const createPost: MutationResolvers<GQLContext>['createPost'] = async (
  parent,
  { input },
  { dataSources },
) => {
  const { postAPI } = dataSources;
  const post = await postAPI.createPost(input);
  if (post) {
    return {
      success: true,
      message: 'Post has been created successfully',
      post,
    };
  }

  return {
    success: false,
    message: 'Post could not be created',
    post: null,
  };
};
