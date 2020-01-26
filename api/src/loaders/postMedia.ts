import { ID } from '../types';
import { createMultiLoader } from './utils';
import { PostMedia } from '../entity/PostMedia';

export const createPostMediaByPostIdLoader = createMultiLoader<ID, PostMedia>(
  postIds => PostMedia.findByPostIds(postIds as ID[]),
  postMedia => postMedia.postId,
);
