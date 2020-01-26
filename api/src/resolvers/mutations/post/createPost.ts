import { MutationResolvers } from '../../../generated/graphql';
import { GQLContext } from '../../../types';

export const createPost: MutationResolvers<GQLContext>['createPost'] = async (
  parent,
  { input },
  { dataSources },
) => {
  const { postAPI, mediaAPI } = dataSources;

  const { medias } = input;
  const savedMedias = await mediaAPI.uploadMultiple(medias);

  const { title } = input;
  const post = await postAPI.createPost({ title, medias: savedMedias });
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
