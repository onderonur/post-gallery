import FileStorageAPI from './FileStorageAPI';
import PostAPI from './PostAPI';

const dataSources = () => ({
  postAPI: new PostAPI(),
  fileStorageAPI: new FileStorageAPI(),
});

export type DataSources = ReturnType<typeof dataSources>;

export default dataSources;
