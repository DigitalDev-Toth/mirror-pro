import React from 'react';
import PropTypes from 'prop-types';

/**
 * The Desk container.
 *
 * @class      Desk
 * @param      {object}  props   The component properties
 * @return     {node}    The desk container.
 */
const Desk = (props) => {
  return (
    <div>
      <div>{`${props.a}${props.b}`}</div>
    </div>
  );
};

/**
 * Component default properties.
 */
Desk.propTypes = {
  a: PropTypes.string,
  b: PropTypes.string,
};

/**
 * Component properties types.
 */
Desk.defaultProps = {
  a: 'De',
  b: 'sk',
};

export default Desk;
