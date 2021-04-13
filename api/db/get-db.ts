import AuthTokenRepository from '../auth/authtoken.repository';
import MediaRepository from '../media/media.repository';
import ReactionRepository from '../reactions/reaction.repository';
import CommentRepository from '../comments/comment.repository';
import PostRepository from '../posts/post.repository';
import UserRepository from '../users/user.repository';
import CategoryRepository from '../categories/category.repository';

const getDb = () => ({
  authToken: new AuthTokenRepository(),
  user: new UserRepository(),
  category: new CategoryRepository(),
  post: new PostRepository(),
  media: new MediaRepository(),
  reaction: new ReactionRepository(),
  comment: new CommentRepository(),
});

export type DB = ReturnType<typeof getDb>;

export default getDb;
