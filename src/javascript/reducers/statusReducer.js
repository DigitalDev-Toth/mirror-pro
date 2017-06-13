import {
  DESK_COUNTER,
  UPDATE_WINDOWING,
  UPDATE_CURRENT_TOOL,
} from '../settings/constants';

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

    case UPDATE_WINDOWING: {
      return {
        ...state,
        window: {
          center: action.center,
          width: action.width,
        },
      };
    }

    case UPDATE_CURRENT_TOOL: {
      return {
        ...state,
        tool: action.tool,
      };
    }

    default: {
      return state;
    }
  }
};

/**
 * The initial state of the status reducer store.
 *
 * @type       {object}
 */
const initialState = {
  deskCounter: 1,
  tool: 'Windowing',
  window: {
    center: null,
    width: null,
  },
};

export default statusReducer;
