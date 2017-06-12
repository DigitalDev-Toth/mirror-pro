import {
  DESK_COUNTER,
  LOAD_DICOMS,
  SUBMENU_SHOW,
  APPLY_WINDOWING,
  UPDATE_WINDOWING,
  APPLY_CURRENT_TOOL,
  UPDATE_CURRENT_TOOL,
} from '../settings/constants';

/**
 * Action creator for load dicoms.
 *
 * @param      {object}  payload  The payload from some api's endpoint
 */
const loadDicoms = payload => ({
  type: LOAD_DICOMS,
  payload,
});

/**
 * Action creator for counter the current number of desk in grid.
 *
 * @param      {number}  length     The length of desks in grid
 * @param      {string}  operation  The operation to apply to the length
 */
const updateDeskCounter = ({ length, operation }) => ({
  type: DESK_COUNTER,
  length,
  operation,
});

/**
 * Action creator for show submenu.
 *
 * @param      {string}   name  The name of the submenu
 * @param      {boolean}  show  The status to show or not the submenu
 */
const updateSubMenuShow = (name, show) => ({
  type: SUBMENU_SHOW,
  name,
  show,
});

/**
 * Action creator for apply windowing to the dicom image.
 *
 * @param      {number}  center  The center value for apply to the image
 * @param      {number}  width   The width value for apply to the image
 */
const applyWindowLevel = (center, width) => ({
  type: APPLY_WINDOWING,
  center,
  width,
});

/**
 * Action creator for update the value of windowing on status bar.
 *
 * @param      {number}  center  The center value of status bar
 * @param      {number}  width   The width value of status bar
 */
const updateWindowLevel = (center, width) => ({
  type: UPDATE_WINDOWING,
  center,
  width,
});

/**
 * Action creator for update the current tool to use.
 *
 * @param      {string}  tool    The current tool to use
 */
const applyCurrentTool = tool => ({
  type: APPLY_CURRENT_TOOL,
  tool,
});

/**
 * Action creator for update the current tool used on status bar.
 *
 * @param      {string}  tool    The current tool used
 */
const updateCurrentTool = tool => ({
  type: UPDATE_CURRENT_TOOL,
  tool,
});

export default {
  loadDicoms,
  updateDeskCounter,
  updateSubMenuShow,
  applyWindowLevel,
  updateWindowLevel,
  applyCurrentTool,
  updateCurrentTool,
};
