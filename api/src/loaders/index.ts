import * as postFile from './postFile';

export const createLoaders = () => {
  return {
    postFileByPostIdLoader: postFile.createPostFileByPostIdLoader(),
  };
};

export type Loaders = ReturnType<typeof createLoaders>;
