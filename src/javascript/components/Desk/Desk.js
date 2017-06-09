import React from 'react';
// import PropTypes from 'prop-types';
import {
  getDicom,
  // zoomDownHandler,
  // zoomMoveHandler,
  // panDownHandler,
  // panMoveHandler,
  rotateDownHandler,
  rotateMoveHandler,
} from './DeskHelper';
import './Desk.style.scss';

const deskData = {
  camera: null,
  canvas: null,
  globalMouse: null,
  lastY: 0,
  localMouse: null,
  pan: { x: 0, y: 0 },
  panDiff: { x: 0, y: 0 },
  pivot: null,
  plane: null,
  planeParent: null,
  origin: { x: 0, y: 0 },
  ratio: 0,
  renderer: null,
  rotate: 0,
  rotateDiff: { x: 0, y: 0 },
  scale: 1,
  scaleDiff: { x: 0, y: 0 },
  scene: null,
};
let mouseMove = false;

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
        onMouseDown={(event) => {
          mouseMove = true;
          // zoomDownHandler(event, deskData);
          // panDownHandler(event, deskData);
          rotateDownHandler(event, deskData);
        }}
        onMouseMove={(event) => {
          if (mouseMove) {
            // zoomMoveHandler(event, deskData);
            // panMoveHandler(event, deskData);
            rotateMoveHandler(event, deskData);
          }
        }}
        onMouseUp={() => { mouseMove = false; }}
        ref={() => getDicom(deskData)}
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
