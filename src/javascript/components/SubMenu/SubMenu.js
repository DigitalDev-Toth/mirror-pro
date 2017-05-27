import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './SubMenu.scss';

/**
 * The SubMenu container.
 *
 * @class      SubMenu
 * @param      {object}  props   The component properties
 * @return     {node}    The submenu container.
 */
const SubMenu = (props) => {
  return (
    <div>
      {`submenu ${props.name}`}
      <Button
        onClick={props.onClose}
        text="Back"
      />
    </div>
  );
};

/**
 * Component properties types.
 */
SubMenu.defaultProps = {
  name: 'asdads',
  onClose: () => {},
};

/**
 * Component default properties.
 */
SubMenu.propTypes = {
  name: PropTypes.string,
  onClose: PropTypes.func,
};

export default SubMenu;
