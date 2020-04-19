import { ID, RequestUser } from '../types';
import { createLoader } from './utils';
import { User } from '../db/entity/User';
import Maybe from 'graphql/tsutils/Maybe';

const createUserByIdLoader = createLoader<ID, User>(
  (userIds) => User.findByIds(userIds as ID[]),
  (user) => user.id,
);

const userLoaders = (viewer: Maybe<RequestUser>) => ({
  userById: createUserByIdLoader(viewer),
});

export default userLoaders;
