import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  Grid: gridReducer,
  Menu: menuReducer,
});
