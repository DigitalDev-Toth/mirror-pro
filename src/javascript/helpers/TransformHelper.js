import * as THREE from 'three';

/**
 * Its has the options to generate the submenu with transform tools.
 *
 * @param      {object}  actions  The actions to update the store
 * @return     {array}   The options to generate th submenu.
 */
export const subMenuTransform = (actions) => {
  return [
    { text: 'Zoom', click: () => transform(actions, 'zoom', 'Zoom') },
    { text: 'Pan', click: () => transform(actions, 'pan', 'Pan') },
    { text: 'Rotation', click: () => transform(actions, 'rotation', 'Rotation') },
  ];
};

/**
 * Handle the actions to update the store with the tool selected.
 *
 * @param      {object}  actions    The actions to update the store
 * @param      {string}  tool       The tool name
 * @param      {string}  toolLabel  The tool label
 */
export const transform = (actions, tool, toolLabel) => {
  actions.applyCurrentTool(tool);
  actions.updateCurrentTool(toolLabel);
};

/**
 * Handle the zoom tool when the mouse down event its triggered.
 *
 * @param      {object}  event     The mouse down event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const zoomDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.last.y = y;

  const vector = new THREE.Vector3();

  vector.set(
    ((x / deskData.canvas.width) * 2) - 1,
    (-(y / deskData.canvas.height) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;

  deskData.globalMouse = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));
  deskData.localMouse = deskData.planeParent
  .worldToLocal(new THREE.Vector3(deskData.globalMouse.x, deskData.globalMouse.y, 0.0));
  deskData.scaleDiff.x = deskData.globalMouse.x - deskData.localMouse.x;
  deskData.scaleDiff.y = deskData.globalMouse.y - deskData.localMouse.y;
  deskData.origin.x = deskData.localMouse.x;
  deskData.origin.y = deskData.localMouse.y;
};

/**
 * Handle the zoom tool when the mouse move event its triggered.
 *
 * @param      {object}  event     The mouse move event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const zoomMoveHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const y = event.clientY - rect.top;
  const delta = Math.abs(y - deskData.last.y) / 1000;

  if (deskData.last.y > y) {
    deskData.ratio = 1.03 + delta;
  } else {
    deskData.ratio = 0.97 - delta;
  }

  deskData.scale *= deskData.ratio;

  zoomDicom(deskData);

  deskData.last.y = y;
};

/**
 * Make the geometry transformation of zoom tool.
 *
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
const zoomDicom = (deskData) => {
  const { scale, origin, scaleDiff } = deskData;

  deskData.planeParent.scale.x = scale;
  deskData.planeParent.scale.y = scale;
  deskData.planeParent.position.x = (-origin.x * (scale - 1)) + scaleDiff.x;
  deskData.planeParent.position.y = (-origin.y * (scale - 1)) + scaleDiff.y;
};

/**
 * Handle the pan tool when the mouse down its triggered.
 *
 * @param      {object}  event     The mouse down event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const panDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const vector = new THREE.Vector3();

  vector.set(
    ((x / deskData.canvas.width) * 2) - 1,
    (-(y / deskData.canvas.height) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;

  deskData.globalMouse = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));
  deskData.localMouse = deskData.planeParent
  .worldToLocal(new THREE.Vector3(
    deskData.globalMouse.x,
    deskData.globalMouse.y,
    0.0,
  ));
};

/**
 * Handle the pan tool when mouse move its triggered.
 *
 * @param      {object}  event     The mouse move event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const panMoveHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.last.y = y;

  const vector = new THREE.Vector3();

  vector.set(
    ((x / deskData.canvas.width) * 2) - 1,
    (-(y / deskData.canvas.height) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;
  const global = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));

  deskData.pan.x = (global.x - deskData.globalMouse.x);
  deskData.pan.y = (global.y - deskData.globalMouse.y);
  deskData.panDiff.x = deskData.globalMouse.x - deskData.localMouse.x;
  deskData.panDiff.y = deskData.globalMouse.y - deskData.localMouse.y;

  panDicom(deskData);
};

/**
 * Make the geometry transformation of pan tool.
 *
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
const panDicom = (deskData) => {
  const { pan, panDiff, localMouse, scale } = deskData;

  deskData.planeParent.position.x = (pan.x + panDiff.x) - (localMouse.x * (scale - 1));
  deskData.planeParent.position.y = (pan.y + panDiff.y) - (localMouse.y * (scale - 1));
};

/**
 * Handle the rotate tool when mouse down event its triggered.
 *
 * @param      {object}  event     The mouse down event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const rotateDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.last.y = y;

  const vector = new THREE.Vector3();

  vector.set(
    ((x / deskData.canvas.width) * 2) - 1,
    (-(y / deskData.canvas.height) * 2) + 1,
    0.5,
  );
  vector.unproject(deskData.camera);

  const dir = vector.sub(deskData.camera.position).normalize();
  const distance = -deskData.camera.position.z / dir.z;

  deskData.globalMouse = deskData.camera
  .position
  .clone()
  .add(dir.multiplyScalar(distance));
  deskData.localMouse = deskData.plane
  .worldToLocal(new THREE.Vector3(
    deskData.globalMouse.x,
    deskData.globalMouse.y,
    0.0,
  ));
  deskData.rotateDiff.x = deskData.globalMouse.x - deskData.localMouse.x;
  deskData.rotateDiff.y = deskData.globalMouse.y - deskData.localMouse.y;
};

/**
 * Handle the rotate tool when mouse move event its triggered.
 *
 * @param      {object}  event     The mouse move event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const rotateMoveHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const y = event.clientY - rect.top;

  deskData.rotate += (y - deskData.last.y) / 50;

  rotateDicom(deskData);

  deskData.last.y = y;
};

/**
 * Make the geometry transformation of rotate tool.
 *
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
const rotateDicom = (deskData) => {
  const { localMouse, rotate, rotateDiff } = deskData;

  deskData.plane.position.x = -localMouse.x;
  deskData.plane.position.y = -localMouse.y;
  deskData.pivot.rotation.z = rotate;
  deskData.planeParent.position.x = localMouse.x + rotateDiff.x;
  deskData.planeParent.position.y = localMouse.y + rotateDiff.y;
};
