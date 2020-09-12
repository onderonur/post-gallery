import AuthTokenRepository from './authToken';
import MediaRepository from './media';
import ReactionRepository from './reaction';
import CommentRepository from './comment';
import PostRepository from './post';
import UserRepository from './user';
import CategoryRepository from './category';

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
