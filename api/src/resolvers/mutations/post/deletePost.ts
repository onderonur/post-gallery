import { MutationResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const deletePost: MutationResolvers<GQLContext>['deletePost'] = async (
  parent,
  { id },
  { dataSources },
) => {
  const { postAPI } = dataSources;
  const deleted = await postAPI.deletePost(id);
  if (deleted) {
    return {
      success: true,
      message: 'Post has been deleted successfully',
    };
  }
  return {
    success: false,
    message: 'An error occured while deleting the post',
  };
};
