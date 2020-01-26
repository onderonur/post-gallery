import * as postMedia from './postMedia';

export const createLoaders = () => {
  return {
    postMediaByPostIdLoader: postMedia.createPostMediaByPostIdLoader(),
  };
};

export type Loaders = ReturnType<typeof createLoaders>;
