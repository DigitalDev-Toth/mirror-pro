import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './SubMenu.style.scss';

/**
 * The SubMenu container.
 *
 * @class      SubMenu
 * @param      {object}  props   The component properties
 * @return     {node}    The submenu container.
 */
const SubMenu = (props) => {
  return (
    <div className="SubMenu">
      {props.items.map((item) => {
        return (
          <Button
            click={item.click}
            key={item.text}
            text={item.text}
          />
        );
      })}
      <Button
        click={props.close}
        text="Back"
      />
    </div>
  );
};

/**
 * Component default properties.
 */
SubMenu.propTypes = {
  close: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

/**
 * Component properties types.
 */
SubMenu.defaultProps = {
  close: () => {},
};

export default SubMenu;
