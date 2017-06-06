import { DESK_COUNTER } from '../settings/constants';

/**
 * Reducer who push new state into store for Status container.
 *
 * @param      {object}  state   The current state in store
 * @param      {object}  action  The action for generate the next state in store
 * @return     {object}  The next state to push into store.
 */
const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case DESK_COUNTER: {
      let deskCounter = action.length;

      if (action.operation === '-') {
        deskCounter = state.deskCounter - 1;
      } else if (action.operation === '+') {
        deskCounter = state.deskCounter + 1;
      }

      return { ...state, deskCounter };
    }

    default: {
      return state;
    }
  }
};

const initialState = { deskCounter: 1 };

export default statusReducer;
