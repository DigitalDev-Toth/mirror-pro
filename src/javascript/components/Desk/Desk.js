import React from 'react';
import PropTypes from 'prop-types';
import { getDicom } from './DeskHelper';
import {
  zoomDownHandler,
  zoomMoveHandler,
  panDownHandler,
  panMoveHandler,
  rotateDownHandler,
  rotateMoveHandler,
} from '../../helpers/TransformHelper';
import {
  windowingDownHandler,
  windowingMoveHandler,
  windowingDicom,
} from '../../helpers/FilterHelper';
import './Desk.style.scss';

/**
 * Common desk data info with mutate capability.
 *
 * @type       {object}
 */
const deskData = {
  camera: null,
  canvas: null,
  globalMouse: null,
  last: { x: null, y: null },
  localMouse: null,
  pan: { x: 0, y: 0 },
  panDiff: { x: 0, y: 0 },
  pivot: null,
  plane: null,
  planeParent: null,
  origin: { x: 0, y: 0 },
  originalWindow: { center: null, width: null },
  ratio: 0,
  renderer: null,
  rotate: 0,
  rotateDiff: { x: 0, y: 0 },
  scale: 1,
  scaleDiff: { x: 0, y: 0 },
  scene: null,
  window: { center: null, width: null },
};
let mouseMove = false;

/**
 * The Desk container.
 *
 * @class      Desk
 * @param      {object}  props   The component properties
 * @return     {node}    The desk container.
 */
const Desk = (props) => {
  if (deskData.renderer && props.tool === 'windowing') {
    deskData.window.center = props.windowLevel.center;
    deskData.window.width = props.windowLevel.width;

    windowingDicom(deskData);
  }

  return (
    <div className="Desk">
      {/* <span className="Desk-Empty">Empty</span> */}
      <canvas
        className="Desk-Canvas"
        id="Desk"
        onMouseDown={(event) => {
          mouseMove = true;
          if (props.tool === 'zoom') {
            zoomDownHandler(event, deskData);
          } else if (props.tool === 'pan') {
            panDownHandler(event, deskData);
          } else if (props.tool === 'rotation') {
            rotateDownHandler(event, deskData);
          } else {
            windowingDownHandler(event, deskData);
          }
        }}
        onMouseMove={(event) => {
          if (mouseMove) {
            if (props.tool === 'zoom') {
              zoomMoveHandler(event, deskData);
            } else if (props.tool === 'pan') {
              panMoveHandler(event, deskData);
            } else if (props.tool === 'rotation') {
              rotateMoveHandler(event, deskData);
            } else {
              windowingMoveHandler(event, deskData);
            }
          }
        }}
        onMouseUp={() => { mouseMove = false; }}
        ref={() => {
          if (!deskData.renderer) {
            getDicom(deskData, props.actions);
          }
        }}
      />
    </div>
  );
};

/**
 * Component default properties.
 */
Desk.propTypes = {
  actions: PropTypes.shape().isRequired,
  tool: PropTypes.string.isRequired,
  windowLevel: PropTypes.shape().isRequired,
};

/**
 * Component properties types.
 */
Desk.defaultProps = {};

export default Desk;
