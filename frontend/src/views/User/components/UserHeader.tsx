import React from "react";
import { Avatar, Box, makeStyles, Theme } from "@material-ui/core";
import { BoldText } from "@/components/Text";
import { FlexCol } from "@/components/FlexCol";
import gql from "graphql-tag";
import { gradientBackground } from "@/styles";
import useIsMobile from "@/hooks/useIsMobile";
import { UserHeader_UserFragment } from "@/generated/graphql";

const avatarSizes = {
  large: 12,
  small: 6,
};

interface UserAvatarStyleProps {
  size: number;
}

const useStyles = makeStyles<Theme, UserAvatarStyleProps>((theme) => ({
  avatar: {
    height: ({ size }) => theme.spacing(size),
    width: ({ size }) => theme.spacing(size),
    border: `0.2rem solid ${theme.palette.background.paper}`,
  },
  header: {
    ...gradientBackground(
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
  },
}));

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

const UserHeader = React.memo<UserHeaderProps>(({ user }) => {
  const isMobile = useIsMobile();
  const classes = useStyles({
    size: isMobile ? avatarSizes.small : avatarSizes.large,
  });

  return (
    <Box paddingY={2} clone>
      <FlexCol className={classes.header} alignItems="center">
        <Avatar
          className={classes.avatar}
          src={user.thumbnailUrl || ""}
          alt={user.displayName}
        />
        <BoldText variant="h6" component="h1" noWrap>
          {user.displayName}
        </BoldText>
      </FlexCol>
    </Box>
  );
});

export default UserHeader;
