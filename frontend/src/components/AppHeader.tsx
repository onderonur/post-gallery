import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BaseButton from "./BaseButton";
import { useViewer } from "./ViewerProvider";
import { Box, makeStyles } from "@material-ui/core";
import BaseLink from "./BaseLink";
import CreatePostDialog from "./CreatePostDialog";
import UserMenu from "./UserMenu";
import FlexRow from "./FlexRow";
import URLS from "@/constants/urls";
import NextLink from "./NextLink";

const LoginButton = () => {
  return (
    <BaseButton
      variant="text"
      color="inherit"
      href={URLS.login}
      component={NextLink}
    >
      Login
    </BaseButton>
  );
};

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  headerLink: {
    fontWeight: theme.typography.fontWeightBold,
    "&:hover": {
      textDecoration: "none",
    },
  },
  buttons: {
    marginRight: theme.spacing(1),
  },
}));

const AppHeader: React.RefForwardingComponent<unknown> = (props, ref) => {
  const classes = useStyles();
  const viewer = useViewer();
  return (
    <>
      <AppBar ref={ref} position="fixed" color="inherit">
        <Toolbar>
          <BaseLink
            className={classes.headerLink}
            href={URLS.posts}
            variant="h6"
            color="primary"
          >
            Post Gallery
          </BaseLink>
          <Box flex={1} />
          <FlexRow className={classes.buttons}>
            <CreatePostDialog />
            {viewer ? <UserMenu /> : <LoginButton />}
          </FlexRow>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default React.forwardRef(AppHeader);
