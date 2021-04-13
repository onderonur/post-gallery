import PostAPI from '@api/posts/post.datasource';
import MediaAPI from '@api/media/media.datasource';
import CommentAPI from '@api/comments/comment.datasource';
import { UserAPI } from '@api/users/user.datasource';
import ReactionAPI from '@api/reactions/reaction.datasource';
import { AuthTokenAPI } from '@api/auth/authtoken.datasource';
import CategoryAPI from '@api/categories/category.datasource';

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
