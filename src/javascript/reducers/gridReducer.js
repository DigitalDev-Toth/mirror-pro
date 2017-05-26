import { LOAD_DICOMS } from '../settings/constants';

/**
 * Reducer who push new state into store for Grid container.
 *
 * @param      {Object}  state   The current state in store
 * @param      {Object}  action  The action for generate the next state in store
 * @return     {Object}  The next state to push into store.
 */
const gridReducer = (state = initialState, action) => {
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

export default gridReducer;
