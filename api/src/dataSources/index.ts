import PostAPI from './PostAPI';
import MediaAPI from './MediaAPI';

const dataSources = () => ({
  postAPI: new PostAPI(),
  mediaAPI: new MediaAPI(),
});

export type DataSources = ReturnType<typeof dataSources>;

export default dataSources;
