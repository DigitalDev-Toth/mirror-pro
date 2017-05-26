import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import gridReducer from './gridReducer';
import navigationReducer from './navigationReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  Menu: menuReducer,
  Grid: gridReducer,
  Navigation: navigationReducer,
  Status: statusReducer,
});
