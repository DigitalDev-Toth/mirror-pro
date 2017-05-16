import React from 'react';
import PropTypes from 'prop-types';

const SecondaryMenu = (props) => {
  return (
    <div>
      <div>{`${props.a}${props.b}`}</div>
    </div>
  );
};

SecondaryMenu.propTypes = {
  a: PropTypes.string,
  b: PropTypes.string,
};

SecondaryMenu.defaultProps = {
  a: 'Secondary',
  b: 'Menu',
};

export default SecondaryMenu;
