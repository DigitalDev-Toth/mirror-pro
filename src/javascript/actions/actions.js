import {
  DESK_COUNTER,
  LOAD_DICOMS,
  SUBMENU_SHOW,
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

export default {
  loadDicoms,
  updateDeskCounter,
  updateSubMenuShow,
};
