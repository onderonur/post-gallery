import React, { useContext } from 'react';
import { MenuProps } from '@material-ui/core/Menu';
import { MenuItemProps } from '@material-ui/core/MenuItem';

interface BaseMenuContextValue {
  anchorEl: MenuProps['anchorEl'];
  openMenu: MenuItemProps['onClick'];
  closeMenu: MenuProps['onClose'];
}

const BaseMenuContext = React.createContext<BaseMenuContextValue>(
  {} as BaseMenuContextValue,
);

export function useBaseMenuContext() {
  const value = useContext(BaseMenuContext);
  return value;
}

interface BaseMenuProviderProps {
  value: BaseMenuContextValue;
}

const BaseMenuProvider: React.FC<BaseMenuProviderProps> = ({
  value,
  children,
}) => {
  return (
    <BaseMenuContext.Provider value={value}>
      {children}
    </BaseMenuContext.Provider>
  );
};

export default BaseMenuProvider;
