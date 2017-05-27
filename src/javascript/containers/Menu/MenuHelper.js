import React from 'react';
import SubMenu from '../../components/SubMenu/SubMenu';

export const subMenuShowHandler = (actions, name, show) => {
  actions.updateSubMenuShow(name, show);
};

export const subMenuComponent = (actions, name, show) => {
  if (!show) {
    return null;
  }

  return (
    <SubMenu
      name={name}
      onClose={() => subMenuShowHandler(actions, name, false)}
    />
  );
};
