import React from 'react';
import { useConfirmDialog } from '../confirm-dialog/ConfirmDialog';
import { Avatar, MenuItem } from '@material-ui/core';
import { useViewer } from '../auth/ViewerContext';
import BaseIconButton from '@src/modules/shared/BaseIconButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useRouter } from 'next/router';
import { redirectToHome, urls } from '@src/modules/routing/RoutingUtils';
import restClient from '@src/modules/rest-client/RestClient';
import BaseMenuTrigger from '@src/modules/base-menu/BaseMenuTrigger';
import BaseMenu from '@src/modules/base-menu/BaseMenu';
import BaseMenuList from '@src/modules/base-menu/BaseMenuList';
import styled from '@emotion/styled';

const AvatarButton = styled(BaseIconButton)`
  /* 
  To make the BaseIconButton with an avatar in it, 
  same size as a normal BaseIconButton.
  */
  padding: ${({ theme }) => theme.spacing(0.5)}px;
`;

const UserMenu = React.memo(function UserMenu() {
  const confirm = useConfirmDialog();
  const router = useRouter();
  const viewer = useViewer();
  const thumbnailUrl = viewer?.thumbnailUrl;
  return (
    <BaseMenu>
      <BaseMenuTrigger>
        {thumbnailUrl ? (
          <AvatarButton color="primary">
            <Avatar src={thumbnailUrl} alt={viewer?.displayName} />
          </AvatarButton>
        ) : (
          <BaseIconButton color="primary">
            <AccountCircleOutlinedIcon />
          </BaseIconButton>
        )}
      </BaseMenuTrigger>
      <BaseMenuList>
        <MenuItem
          onClick={() => {
            router.push(urls.userProfile(viewer?.id ?? ''));
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm({
              title: 'Log Out?',
              description: 'Are you sure to log out?',
              confirmText: 'Log Out',
              onConfirm: async () => {
                await restClient.auth.logout();
                // to support logging out from all windows
                const logoutTimeStamp = Date.now().toString();
                localStorage.setItem('logout', logoutTimeStamp);
                redirectToHome(logoutTimeStamp);
              },
            });
          }}
        >
          Log Out
        </MenuItem>
      </BaseMenuList>
    </BaseMenu>
  );
});

export default UserMenu;
