import React from 'react';
// import PropTypes from 'prop-types';
import { getDicom } from './DeskHelper';
import './Desk.style.scss';

/**
 * The Desk container.
 *
 * @class      Desk
 * @param      {object}  props   The component properties
 * @return     {node}    The desk container.
 */
const Desk = () => {
  return (
    <div className="Desk">
      {/* <span className="Desk-Empty">Empty</span> */}
      <canvas
        className="Desk-Canvas"
        id="Desk"
        ref={() => getDicom()}
      />
    </div>
  );
};

/**
 * Component default properties.
 */
Desk.propTypes = {};

/**
 * Component properties types.
 */
Desk.defaultProps = {};

export default Desk;
