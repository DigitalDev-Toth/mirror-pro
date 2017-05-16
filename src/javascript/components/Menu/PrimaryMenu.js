import React from 'react';
import PropTypes from 'prop-types';

const PrimaryMenu = (props) => {
  return (
    <div>
      <div>{`${props.a}${props.b}`}</div>
    </div>
  );
};

PrimaryMenu.propTypes = {
  a: PropTypes.string,
  b: PropTypes.string,
};

PrimaryMenu.defaultProps = {
  a: 'Primary',
  b: 'Menu',
};

export default PrimaryMenu;
