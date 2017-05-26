import { LOAD_DICOMS } from '../settings/constants';

/**
 * Action creator for load dicoms.
 *
 * @param      {Object}  payload  The payload from some api's endpoint
 */
const loadDicoms = payload => ({
  type: LOAD_DICOMS,
  payload,
});

export default { loadDicoms };
