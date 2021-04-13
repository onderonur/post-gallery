import React from 'react';
import BaseLink from '@src/modules/routing/BaseLink';
import { urls } from '@src/modules/routing/RoutingUtils';
import { APP_TITLE } from '@src/modules/shared/SharedUtils';
import Stack from '@src/modules/shared/Stack';
import { Bold } from '@src/modules/styling/StylingUtils';
import { useAppDrawer } from './AppLayoutContext';
import MenuIcon from '@material-ui/icons/Menu';
import BaseIconButton from '@src/modules/shared/BaseIconButton';
import { useIsMobile } from '@src/modules/shared/SharedHooks';

const AppTitle = React.memo(function AppTitle() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useAppDrawer();
  const isMobile = useIsMobile();
  return (
    <Stack flexDirection="row" spacing={1}>
      {isMobile && (
        <BaseIconButton onClick={isDrawerOpen ? closeDrawer : openDrawer}>
          <MenuIcon />
        </BaseIconButton>
      )}
      <BaseLink href={urls.home.href} variant="h6" color="primary">
        <Bold>{APP_TITLE}</Bold>
      </BaseLink>
    </Stack>
  );
});

export default AppTitle;
