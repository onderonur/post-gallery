import React from 'react';
import { useBaseMenuContext } from '../contexts/BaseMenuContext';

const BaseMenuTrigger: React.FC = ({ children }) => {
  const { openMenu } = useBaseMenuContext();
  return (
    <>
      {React.Children.map(children, (child) => {
        // We are passing additional props to children of "BaseMenuTrigger".
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(child as any, {
          onClick: openMenu,
          // eslint-disable-next-line no-useless-computed-key
          ['aria-controls']: 'base-menu',
          // eslint-disable-next-line no-useless-computed-key
          ['aria-haspopup']: 'true',
        });
      })}
    </>
  );
};

export default BaseMenuTrigger;
