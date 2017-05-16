import { LOAD_DICOMS } from '../settings/constants';

/**
 * @name loadDicoms
 * @description
 *
 * Action creator for load dicoms.
 *
 * @param  {Object} payload The payload from some api's endpoint
 * @return {Object}         The action for next Redux's state.
 */
const loadDicoms = payload => ({
  type: LOAD_DICOMS,
  payload,
});

export default { loadDicoms };
