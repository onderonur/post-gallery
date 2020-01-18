import { post } from './post';
import { posts } from './posts';
import { postFiles } from './postFiles';

export default {
  Query: {
    post,
    posts,
  },
  Post: {
    postFiles,
  },
};
