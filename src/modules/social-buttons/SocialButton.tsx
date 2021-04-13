import React from 'react';
import SocialButtonBase, { SocialButtonBaseProps } from './SocialButtonBase';
import FacebookIcon, {
  FACEBOOK_BLUE,
  FACEBOOK_WHITE,
} from '@src/modules/social-buttons/FacebookIcon';
import { SocialAccountType } from '@src/generated/graphql';
import GoogleIcon from '@src/modules/social-buttons/GoogleIcon';

const options = {
  [SocialAccountType.Facebook]: {
    icon: <FacebookIcon />,
    backgroundColor: FACEBOOK_BLUE,
    fontColor: FACEBOOK_WHITE,
  },
  [SocialAccountType.Google]: {
    icon: <GoogleIcon />,
    backgroundColor: '#fff',
    fontColor: '#737373',
  },
};

export type SocialButtonProps = Pick<
  SocialButtonBaseProps,
  'loading' | 'disabled' | 'error' | 'children' | 'onClick'
> & {
  socialAccountType: SocialAccountType;
};

function SocialButton({ socialAccountType, ...rest }: SocialButtonProps) {
  return <SocialButtonBase {...options[socialAccountType]} {...rest} />;
}

export default SocialButton;
