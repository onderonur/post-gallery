import React from "react";
import BaseMenu, { BaseMenuList, BaseMenuTrigger } from "./BaseMenu";
import { useConfirmDialog } from "./ConfirmDialog";
import { Avatar, MenuItem } from "@material-ui/core";
import { useViewer } from "./ViewerProvider";
import BaseIconButton from "./BaseIconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import URLS, { setUrlParams } from "constants/urls";

// To make the IconButton with an avatar in it,
// same size as a normal IconButton.
const ButtonWithAvatar = styled(BaseIconButton)`
  padding: ${({ theme }) => theme.spacing(0.5)}px;
`;

const UserMenu = () => {
  const confirm = useConfirmDialog();
  const history = useHistory();
  const viewer = useViewer();
  const thumbnailUrl = viewer?.thumbnailUrl;
  return (
    <BaseMenu>
      <BaseMenuTrigger>
        {thumbnailUrl ? (
          <ButtonWithAvatar color="primary">
            <Avatar src={thumbnailUrl} alt={viewer?.displayName} />
          </ButtonWithAvatar>
        ) : (
          <BaseIconButton color="primary">
            <AccountCircleOutlinedIcon />
          </BaseIconButton>
        )}
      </BaseMenuTrigger>
      <BaseMenuList>
        <MenuItem
          onClick={() => {
            history.push(
              setUrlParams(URLS.user, {
                userId: viewer?.id || "",
              }),
            );
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
              onConfirm: () => (window.location.href = "/auth/logout"),
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
