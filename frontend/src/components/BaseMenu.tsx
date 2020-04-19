import React, { useCallback, useContext, useMemo } from "react";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { MenuItemProps } from "@material-ui/core/MenuItem";

interface BaseMenuContextValue {
  anchorEl: MenuProps["anchorEl"];
  openMenu: MenuItemProps["onClick"];
  closeMenu: MenuProps["onClose"];
}

const BaseMenuContext = React.createContext<BaseMenuContextValue>(
  {} as BaseMenuContextValue,
);

function useBaseMenuContext() {
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

export const BaseMenuList: React.FC = ({ children }) => {
  const { anchorEl, closeMenu } = useBaseMenuContext();
  if (!children) {
    return null;
  }
  return (
    <Menu
      id="base-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
    >
      {React.Children.map(
        children,
        // TODO: Will check these type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child: any) => {
          // TODO: Will check these type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const onClick = (e: any) => {
            child?.props.onClick?.(e);
            closeMenu?.(e, "backdropClick");
          };

          return React.cloneElement(child, { onClick });
        },
      )}
    </Menu>
  );
};

export const BaseMenuTrigger: React.FC = ({ children }) => {
  const { openMenu } = useBaseMenuContext();
  return (
    <>
      {React.Children.map(children, (child) => {
        // We are passing additional props to children of "BaseMenuTrigger".
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(child as any, {
          onClick: openMenu,
          // eslint-disable-next-line no-useless-computed-key
          ["aria-controls"]: "base-menu",
          // eslint-disable-next-line no-useless-computed-key
          ["aria-haspopup"]: "true",
        });
      })}
    </>
  );
};

export default BaseMenu;
