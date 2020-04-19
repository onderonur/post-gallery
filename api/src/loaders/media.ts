import { ID, RequestUser } from '../types';
import { createLoader } from './utils';
import { Media } from '../db/entity/Media';
import Maybe from 'graphql/tsutils/Maybe';

const createMediaByPostIdLoader = createLoader<ID, Media>(
  postIds => Media.findByPostIds(postIds as ID[]),
  media => media.postId,
);

const mediaLoaders = (viewer: Maybe<RequestUser>) => ({
  mediaByPostId: createMediaByPostIdLoader(viewer),
});

export default mediaLoaders;
