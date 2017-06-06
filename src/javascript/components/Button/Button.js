import React from 'react';
import PropTypes from 'prop-types';
import './Button.style.scss';

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
      onClick={props.click}
    >
      {props.text}
    </button>
  );
};

/**
 * Component default properties.
 */
Button.propTypes = {
  click: PropTypes.func.isRequired,
  modifier: PropTypes.string,
  text: PropTypes.string.isRequired,
};

/**
 * Component properties types.
 */
Button.defaultProps = {
  click: () => {},
  modifier: 'default',
  text: 'Action',
};

export default Button;
