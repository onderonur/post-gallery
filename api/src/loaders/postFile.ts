import { ID } from '../types';
import { createMultiLoader } from './utils';
import { PostFile } from '../entity/PostFile';

export const createPostFileByPostIdLoader = createMultiLoader<ID, PostFile>(
  postIds => PostFile.findByPostIds(postIds as ID[]),
  postFile => postFile.postId,
);
