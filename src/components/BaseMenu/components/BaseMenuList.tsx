import React from 'react';
import Menu from '@material-ui/core/Menu';
import { useBaseMenuContext } from '../contexts/BaseMenuContext';

const BaseMenuList: React.FC = ({ children }) => {
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
      {React.Children.map(children, (child) => {
        // https://stackoverflow.com/a/42261933/10876256
        if (!React.isValidElement(child)) {
          throw new Error('BaseMenuList children are not valid');
        }
        const onClick = (e: React.MouseEvent) => {
          child?.props.onClick?.(e);
          closeMenu?.(e, 'backdropClick');
        };

        return React.cloneElement(child, { onClick });
      })}
    </Menu>
  );
};

export default BaseMenuList;
