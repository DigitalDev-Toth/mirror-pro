import {
  LOAD_DICOMS,
  APPLY_WINDOWING,
  APPLY_CURRENT_TOOL,
} from '../settings/constants';

/**
 * Reducer who push new state into store for Grid container.
 *
 * @param      {object}  state   The current state in store
 * @param      {object}  action  The action for generate the next state in store
 * @return     {object}  The next state to push into store.
 */
const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DICOMS: {
      return { counter: state.counter + 1 };
    }

    case APPLY_WINDOWING: {
      return {
        ...state,
        window: {
          center: action.center,
          width: action.width,
        },
      };
    }

    case APPLY_CURRENT_TOOL: {
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

const initialState = {
  counter: 1,
  tool: 'windowing',
  window: {
    center: null,
    width: null,
  },
};

export default gridReducer;
