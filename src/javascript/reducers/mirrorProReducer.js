import { LOAD_DICOMS } from '../settings/constants';

/**
 * @name mirrorProReducer
 * @description
 *
 * Reducer who push new state into Redux' store for MirrorPro page.
 *
 * @param  {Object} state  The current state in Redux's store
 * @param  {Object} action The action for generate the next state in Redux's store
 * @return {Object}        The next state to push into Redux's store.
 */
const mirrorProReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DICOMS: {
      return { counter: state.counter + 1 };
    }

    default: {
      return state;
    }
  }
};

const initialState = { counter: 1 };

export default mirrorProReducer;
