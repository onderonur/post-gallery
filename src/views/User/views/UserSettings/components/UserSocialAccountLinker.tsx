import { gql } from '@apollo/client';
import FacebookLoginButton from '@src/components/FacebookLoginButton';
import GoogleLoginButton from '@src/components/GoogleLoginButton';
import SocialButton from '@src/components/SocialButton';
import { useConfirmDialog } from '@src/contexts/ConfirmDialogContext';
import {
  SocialAccountType,
  useLinkViewerSocialAccountMutation,
  UserSocialAccountLinker_UserFragment,
  useUnlinkViewerSocialAccountMutation,
} from '@src/generated/graphql';
import React, { useCallback } from 'react';

const options = {
  [SocialAccountType.Google]: {
    name: 'Google',
    LinkAccountButton: GoogleLoginButton,
  },
  [SocialAccountType.Facebook]: {
    name: 'Facebook',
    LinkAccountButton: FacebookLoginButton,
  },
};

export const UserSocialAccountLinkerFragments = {
  user: gql`
    fragment UserSocialAccountLinker_user on User {
      id
      googleProfileId
      facebookProfileId
    }
  `,
};

const LINK_VIEWER_SOCIAL_ACCOUNT = gql`
  mutation LinkViewerSocialAccount(
    $socialAccountType: SocialAccountType!
    $token: String!
  ) {
    linkViewerSocialAccount(
      socialAccountType: $socialAccountType
      token: $token
    ) {
      ...UserSocialAccountLinker_user
    }
  }
  ${UserSocialAccountLinkerFragments.user}
`;

const UNLINK_VIEWER_SOCIAL_ACCOUNT = gql`
  mutation UnlinkViewerSocialAccount($socialAccountType: SocialAccountType!) {
    unlinkViewerSocialAccount(socialAccountType: $socialAccountType) {
      ...UserSocialAccountLinker_user
    }
  }
  ${UserSocialAccountLinkerFragments.user}
`;

interface UserSocialAccountLinkerProps {
  user: UserSocialAccountLinker_UserFragment;
  socialAccountType: SocialAccountType;
}

const UserSocialAccountLinker = React.memo<UserSocialAccountLinkerProps>(
  function UserSocialAccountLinker({ user, socialAccountType }) {
    const [
      linkViewerSocialAccount,
      { loading: isLinking, error: linkError },
    ] = useLinkViewerSocialAccountMutation({
      mutation: LINK_VIEWER_SOCIAL_ACCOUNT,
    });
    const [
      unlinkViewerSocialAccount,
      { loading: isUnlinking, error: unlinkError },
    ] = useUnlinkViewerSocialAccountMutation({
      mutation: UNLINK_VIEWER_SOCIAL_ACCOUNT,
      variables: {
        socialAccountType,
      },
    });

    const confirm = useConfirmDialog();

    const socialAccountName = options[socialAccountType].name;

    const profileId =
      socialAccountType === SocialAccountType.Facebook
        ? user.facebookProfileId
        : user.googleProfileId;

    const handleLinkAccount = useCallback(
      (token: string) => {
        linkViewerSocialAccount({
          variables: {
            socialAccountType,
            token,
          },
        });
      },
      [linkViewerSocialAccount, socialAccountType],
    );

    const handleUnlinkAccount = useCallback(() => {
      confirm({
        title: `Unlink Account?`,
        description: `Are you sure to unlink your ${socialAccountName} account?`,
        confirmText: 'Unlink',
        onConfirm: unlinkViewerSocialAccount,
      });
    }, [confirm, socialAccountName, unlinkViewerSocialAccount]);

    const { LinkAccountButton } = options[socialAccountType];

    if (profileId) {
      return (
        <SocialButton
          socialAccountType={socialAccountType}
          loading={isUnlinking}
          error={unlinkError}
          onClick={handleUnlinkAccount}
        >
          Unlink Your {socialAccountName} Account
        </SocialButton>
      );
    }

    return (
      <LinkAccountButton
        onSuccess={handleLinkAccount}
        loading={isLinking}
        error={linkError}
      >
        Link Your {socialAccountName} Account
      </LinkAccountButton>
    );
  },
);

export default UserSocialAccountLinker;
