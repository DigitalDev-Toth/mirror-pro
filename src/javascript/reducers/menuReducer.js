import { SUBMENU_SHOW } from '../settings/constants';

/**
 * Reducer who push new state into store for Menu container.
 *
 * @param      {object}  state   The current state in store
 * @param      {object}  action  The action for generate the next state in store
 * @return     {object}  The next state to push into store.
 */
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMENU_SHOW: {
      return {
        ...state,
        subMenuName: action.name,
        subMenuShow: action.show,
      };
    }

    default: {
      return state;
    }
  }
};

const initialState = {
  subMenuName: null,
  subMenuShow: false,
};

export default menuReducer;
