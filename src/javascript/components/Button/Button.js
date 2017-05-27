import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

/**
 * The Button container.
 *
 * @class      Button
 * @param      {object}  props   The component properties
 * @return     {node}    The button container.
 */
const Button = (props) => {
  return (
    <button
      className={`Button __${props.modifier}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

/**
 * Component default properties.
 */
Button.propTypes = {
  modifier: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

/**
 * Component properties types.
 */
Button.defaultProps = {
  modifier: 'default',
  onClick: () => {},
  text: 'Action',
};

export default Button;
