import BaseDataSource from './BaseDataSource';
import {
  MutationLinkViewerSocialAccountArgs,
  MutationUnlinkViewerSocialAccountArgs,
  UserInput,
} from '../generated/graphql';
import { ID } from '@api/types';
import { verifySocialAccountToken } from '@api/utils/verifySocialAccountToken';

export class UserAPI extends BaseDataSource {
  async findUserById(id: ID) {
    const { db } = this.context;
    const user = await db.user.findOneById(id);
    return user;
  }

  async updateUser(id: ID, input: UserInput) {
    const { db } = this.context;
    // We just update user's some properties.
    // So we don't call a full update here.
    // We patch the given properties.
    const user = await db.user.patch(id, input);
    return user;
  }

  async linkViewerSocialAccount(args: MutationLinkViewerSocialAccountArgs) {
    const { profileId } = await verifySocialAccountToken(args);
    const { db } = this.context;
    const { socialAccountType } = args;
    const updatedViewer = await db.user.linkSocialAccount({
      socialAccountType,
      profileId,
    });
    return updatedViewer;
  }

  async unlinkViewerSocialAccount(args: MutationUnlinkViewerSocialAccountArgs) {
    const { socialAccountType } = args;
    const { db } = this.context;
    const updatedViewer = await db.user.unlinkSocialAccount(socialAccountType);
    return updatedViewer;
  }
}
