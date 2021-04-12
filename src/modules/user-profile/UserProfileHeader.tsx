import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { gql } from '@apollo/client';
import { Bold, gradientBackground } from '@src/modules/styling/StylingUtils';
import { useIsMobile } from '@src/modules/shared/SharedHooks';
import { UserProfileHeader_UserFragment } from '@src/generated/graphql';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import FlexCol from '@src/modules/shared/FlexCol';

enum AvatarSize {
  LARGE = 12,
  SMALL = 6,
}

const StyledHeader = styled(FlexCol)`
  ${({ theme }) => css`
    ${gradientBackground(
      theme.palette.primary.main,
      theme.palette.secondary.main,
    )}
    border-radius: ${theme.shape.borderRadius};
    color: ${theme.palette.primary.contrastText};
  `}
`;

interface UserAvatarStyleProps {
  size: number;
}

const StyledAvatar = styled(Avatar)<UserAvatarStyleProps>`
  height: ${({ theme, size }) => theme.spacing(size)}px;
  width: ${({ theme, size }) => theme.spacing(size)}px;
  border: ${({ theme }) => `0.2rem solid ${theme.palette.background.paper}`};
`;

export const UserProfileHeaderFragments = {
  user: gql`
    fragment UserProfileHeader_user on User {
      id
      thumbnailUrl
      displayName
    }
  `,
};

interface UserProfileHeaderProps {
  user: UserProfileHeader_UserFragment;
}

const UserProfileHeader = React.memo<UserProfileHeaderProps>(
  function UserProfileHeader({ user }) {
    const isMobile = useIsMobile();
    return (
      <Box paddingY={2} clone>
        <StyledHeader alignItems="center">
          <StyledAvatar
            size={isMobile ? AvatarSize.SMALL : AvatarSize.LARGE}
            src={user.thumbnailUrl ?? ''}
            alt={user.displayName}
          />
          <Typography variant="h6" component="h1" noWrap>
            <Bold>{user.displayName}</Bold>
          </Typography>
        </StyledHeader>
      </Box>
    );
  },
);

export default UserProfileHeader;
