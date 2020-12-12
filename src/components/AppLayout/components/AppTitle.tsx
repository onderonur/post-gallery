import React from 'react';
import BaseLink from '../../BaseLink';
import urls from '@src/utils/urls';
import { APP_TITLE } from '@src/utils/appTitle';
import Stack from '@src/components/Stack';
import { Bold } from '@src/components/Utils';
import { useAppDrawer } from '../contexts/AppLayoutContext';
import MenuIcon from '@material-ui/icons/Menu';
import BaseIconButton from '@src/components/BaseIconButton';
import useIsMobile from '@src/hooks/useIsMobile';

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
