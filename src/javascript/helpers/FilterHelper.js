/**
 * Its has the options to generate the submenu with presets tools.
 *
 * @param      {object}  actions  The actions to update the store
 * @return     {array}   The options to generate th submenu.
 */
export const subMenuPresets = (actions) => {
  return [
    { text: 'Bone', click: () => windowing(actions, 300, 1500) },
    { text: 'Abdomen', click: () => windowing(actions, 60, 400) },
    { text: 'Angio', click: () => windowing(actions, 300, 600) },
    { text: 'Brain', click: () => windowing(actions, 40, 80) },
    { text: 'Chest', click: () => windowing(actions, 40, 400) },
    { text: 'Lungs', click: () => windowing(actions, -400, 1500) },
  ];
};

/**
 * Handle the actions to update the store with the tool selected.
 *
 * @param      {object}  actions  The actions to update the store
 * @param      {number}  center   The center value for windowing
 * @param      {number}  width    The width value for windowing
 */
export const windowing = (actions, center, width) => {
  actions.applyWindowLevel(center, width);
  actions.updateWindowLevel(center, width);
};

/**
 * Handle the windowing tool when mouse down event its triggered.
 *
 * @param      {object}  event     The mouse down event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const windowingDownHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.last.x = x;
  deskData.last.y = y;
};

/**
 * Handle the windowing tool when mouse move event its triggered.
 *
 * @param      {object}  event     The mouse move event
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const windowingMoveHandler = (event, deskData) => {
  const rect = deskData.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  deskData.window.center += (y - deskData.last.y);
  deskData.window.width += (x - deskData.last.x);

  windowingDicom(deskData);

  deskData.last.x = x;
  deskData.last.y = y;
};

/**
 * Make the windowing by setting new values of window level to the webgl shader.
 *
 * @param      {object}  deskData  The common desk data
 */
/* eslint-disable no-param-reassign */
export const windowingDicom = (deskData) => {
  deskData.plane.material.uniforms.uWC.value = deskData.window.center;
  deskData.plane.material.uniforms.uWW.value = deskData.window.width;
};
