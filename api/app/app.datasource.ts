import PostAPI from '../posts/post.datasource';
import MediaAPI from '../media/media.datasource';
import CommentAPI from '../comments/comment.datasource';
import { UserAPI } from '../users/user.datasource';
import ReactionAPI from '../reactions/reaction.datasource';
import { AuthTokenAPI } from '../auth/authtoken.datasource';
import CategoryAPI from '../categories/category.datasource';

const dataSources = () => ({
  postAPI: new PostAPI(),
  categoryAPI: new CategoryAPI(),
  mediaAPI: new MediaAPI(),
  commentAPI: new CommentAPI(),
  userAPI: new UserAPI(),
  reactionAPI: new ReactionAPI(),
  authTokenAPI: new AuthTokenAPI(),
});

export type DataSources = ReturnType<typeof dataSources>;

export default dataSources;
