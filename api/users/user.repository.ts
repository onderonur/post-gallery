import { SocialAccountType } from '@api/generated/graphql';
import { ID } from '@api/shared/shared.types';
import { ApolloError, AuthenticationError } from 'apollo-server-micro';
import BaseRepository from '../shared/base.repository';
import { createLoader } from '../db/utils/createLoader';
import { UserModel } from './user.model';

const createUserByIdLoader = createLoader<ID, UserModel>(
  (userIds) => UserModel.query().findByIds(userIds as ID[]),
  (user) => user.id,
);

const createUserByFacebookProfileIdLoader = createLoader<ID, UserModel>(
  (facebookProfileIds) =>
    UserModel.query().whereIn('facebookProfileId', facebookProfileIds as ID[]),
  (user) => user.facebookProfileId,
);

const createUserByGoogleProfileIdLoader = createLoader<ID, UserModel>(
  (googleProfileIds) =>
    UserModel.query().whereIn('googleProfileId', googleProfileIds as ID[]),
  (user) => user.googleProfileId,
);

const createUserByEmailLoader = createLoader<string, UserModel>(
  (emails) => UserModel.query().whereIn('email', emails as string[]),
  (user) => user.email,
);

const userLoaders = () => ({
  userById: createUserByIdLoader(),
  userByFacebookProfileId: createUserByFacebookProfileIdLoader(),
  userByGoogleProfileId: createUserByGoogleProfileIdLoader(),
  userByEmail: createUserByEmailLoader(),
});

type UserDbInput = Pick<
  UserModel,
  | 'displayName'
  | 'email'
  | 'facebookProfileId'
  | 'googleProfileId'
  | 'thumbnailUrl'
>;

class UserRepository extends BaseRepository {
  // We create repositories for each request and each repository
  // initializes its loaders.
  // So, we create loaders for each request.
  private loaders = userLoaders();

  async create(input: UserDbInput) {
    const user = await UserModel.query().insert(input);
    return user;
  }

  async patch(id: ID, input: Partial<UserDbInput>) {
    const user = await UserModel.query().updateAndFetchById(id, input);
    return user;
  }

  async linkSocialAccount(input: {
    socialAccountType: SocialAccountType;
    profileId: ID;
  }) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }
    const { socialAccountType, profileId } = input;
    switch (socialAccountType) {
      case SocialAccountType.Facebook:
        viewer.facebookProfileId = profileId;
        break;
      case SocialAccountType.Google:
        viewer.googleProfileId = profileId;
        break;
    }
    const updatedViewer = await this.patch(viewer.id, viewer);
    return updatedViewer;
  }

  async unlinkSocialAccount(socialAccountType: SocialAccountType) {
    const { viewer } = this.context;
    if (!viewer) {
      throw new AuthenticationError('You are not logged in');
    }
    switch (socialAccountType) {
      case SocialAccountType.Facebook:
        // "patchAndFetchById" doesn't update fields, if we use "undefined".
        // It simply ignores them.
        // So we use "null" here.
        viewer.facebookProfileId = null;
        break;
      case SocialAccountType.Google:
        viewer.googleProfileId = null;
        break;
    }
    const { facebookProfileId, googleProfileId } = viewer;
    const socialProfileIds = [facebookProfileId, googleProfileId].filter(
      (id) => !!id,
    );
    if (!socialProfileIds.length) {
      throw new ApolloError(
        'You need at least one social account that is linked',
      );
    }
    const updatedViewer = await this.patch(viewer.id, viewer);
    return updatedViewer;
  }

  async findOneById(id: ID) {
    const user = await this.loaders.userById.load(id);
    return user;
  }

  async findOneByFacebookProfileId(facebookProfileId: ID) {
    const user = await this.loaders.userByFacebookProfileId.load(
      facebookProfileId,
    );
    return user;
  }

  async findOneByGoogleProfileId(googleProfileId: ID) {
    const user = await this.loaders.userByGoogleProfileId.load(googleProfileId);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.loaders.userByEmail.load(email);
    return user;
  }
}

export default UserRepository;
