import PostAPI from './PostAPI';
import MediaAPI from './MediaAPI';
import CommentAPI from './CommentAPI';
import { UserAPI } from './UserAPI';
import ReactionAPI from './ReactionAPI';

const dataSources = () => ({
  postAPI: new PostAPI(),
  mediaAPI: new MediaAPI(),
  commentAPI: new CommentAPI(),
  userAPI: new UserAPI(),
  reactionAPI: new ReactionAPI(),
});

export type DataSources = ReturnType<typeof dataSources>;

export default dataSources;
