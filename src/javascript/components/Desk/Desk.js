import React from 'react';
import PropTypes from 'prop-types';

const Desk = (props) => {
  return (
    <div>
      <div>{`${props.a}${props.b}`}</div>
    </div>
  );
};

Desk.propTypes = {
  a: PropTypes.string,
  b: PropTypes.string,
};

Desk.defaultProps = {
  a: 'De',
  b: 'sk',
};

export default Desk;
