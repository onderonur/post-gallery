import React, { useCallback, useMemo } from 'react';
import BaseMenuProvider from './BaseMenuContext';

const BaseMenu: React.FC = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const closeMenu = useCallback((e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }, []);

  const contextValue = useMemo(() => ({ anchorEl, openMenu, closeMenu }), [
    anchorEl,
    openMenu,
    closeMenu,
  ]);

  return <BaseMenuProvider value={contextValue}>{children}</BaseMenuProvider>;
};

export default BaseMenu;
