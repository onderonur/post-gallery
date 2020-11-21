import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { Bold, FlexCol } from '@src/components/Utils';
import { gql } from '@apollo/client';
import { gradientBackground } from '@src/styles';
import useIsMobile from '@src/hooks/useIsMobile';
import { UserHeader_UserFragment } from '@src/generated/graphql';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

export const UserHeaderFragments = {
  user: gql`
    fragment UserHeader_user on User {
      id
      thumbnailUrl
      displayName
    }
  `,
};

interface UserHeaderProps {
  user: UserHeader_UserFragment;
}

const UserHeader = React.memo<UserHeaderProps>(function UserHeader({ user }) {
  const isMobile = useIsMobile();
  return (
    <Box paddingY={2} clone>
      <StyledHeader alignItems="center">
        <StyledAvatar
          size={isMobile ? AvatarSize.SMALL : AvatarSize.LARGE}
          src={user.thumbnailUrl || ''}
          alt={user.displayName}
        />
        <Typography variant="h6" component="h1" noWrap>
          <Bold>{user.displayName}</Bold>
        </Typography>
      </StyledHeader>
    </Box>
  );
});

export default UserHeader;
