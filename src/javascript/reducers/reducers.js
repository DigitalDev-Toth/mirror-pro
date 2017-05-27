import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import menuReducer from './menuReducer';
import navigationReducer from './navigationReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  Grid: gridReducer,
  Menu: menuReducer,
  Navigation: navigationReducer,
  Status: statusReducer,
});
