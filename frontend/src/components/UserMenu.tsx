import React from "react";
import BaseMenu, { BaseMenuList, BaseMenuTrigger } from "./BaseMenu";
import { useConfirmDialog } from "./ConfirmDialog";
import { Avatar, MenuItem, makeStyles } from "@material-ui/core";
import { useViewer } from "./ViewerProvider";
import BaseIconButton from "./BaseIconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import URLS from "@/constants/urls";
import { useRouter } from "next/router";
import axios from "axios";
import { redirectToHome } from "@/utils";

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    // To make the IconButton with an avatar in it,
    // same size as a normal IconButton.
    padding: theme.spacing(0.5),
  },
}));

const UserMenu = () => {
  const classes = useStyles();
  const confirm = useConfirmDialog();
  const router = useRouter();
  const viewer = useViewer();
  const thumbnailUrl = viewer?.thumbnailUrl;
  return (
    <BaseMenu>
      <BaseMenuTrigger>
        {thumbnailUrl ? (
          <BaseIconButton className={classes.avatarButton} color="primary">
            <Avatar src={thumbnailUrl} alt={viewer?.displayName} />
          </BaseIconButton>
        ) : (
          <BaseIconButton color="primary">
            <AccountCircleOutlinedIcon />
          </BaseIconButton>
        )}
      </BaseMenuTrigger>
      <BaseMenuList>
        <MenuItem
          onClick={() => {
            router.push(URLS.user, `/users/${viewer?.id}`);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm({
              title: "Logout?",
              description: "Are you sure to logout?",
              confirmText: "Logout",
              onConfirm: async () => {
                const { data } = await axios.post("/api/auth/logout");
                if (data.success) {
                  // to support logging out from all windows
                  const logoutTimeStamp = Date.now().toString();
                  localStorage.setItem("logout", logoutTimeStamp);
                  redirectToHome(logoutTimeStamp);
                }
              },
            });
          }}
        >
          Logout
        </MenuItem>
      </BaseMenuList>
    </BaseMenu>
  );
};

export default UserMenu;
