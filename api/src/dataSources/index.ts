import PostAPI from './PostAPI';
import MediaAPI from './MediaAPI';
import CommentAPI from './CommentAPI';
import { UserAPI } from './UserAPI';
import ReactionAPI from './ReactionAPI';
import { SessionAPI } from './SessionAPI';

const dataSources = () => ({
  postAPI: new PostAPI(),
  mediaAPI: new MediaAPI(),
  commentAPI: new CommentAPI(),
  userAPI: new UserAPI(),
  reactionAPI: new ReactionAPI(),
  sessionAPI: new SessionAPI(),
});

export type DataSources = ReturnType<typeof dataSources>;

export default dataSources;
