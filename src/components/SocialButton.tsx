import React from 'react';
import SocialButtonBase, { SocialButtonBaseProps } from './SocialButtonBase';
import FacebookIcon, { facebookBlue, facebookWhite } from './FacebookIcon';
import { SocialAccountType } from '@src/generated/graphql';
import GoogleIcon from './GoogleIcon';

const options = {
  [SocialAccountType.Facebook]: {
    icon: <FacebookIcon />,
    backgroundColor: facebookBlue,
    fontColor: facebookWhite,
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
