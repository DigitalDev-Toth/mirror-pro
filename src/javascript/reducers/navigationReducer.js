import { LOAD_DICOMS } from '../settings/constants';

/**
 * Reducer who push new state into store for Navigation container.
 *
 * @param      {object}  state   The current state in store
 * @param      {object}  action  The action for generate the next state in store
 * @return     {object}  The next state to push into store.
 */
const navigationReducer = (state = initialState, action) => {
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

export default navigationReducer;
