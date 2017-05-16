import { combineReducers } from 'redux';
import mirrorProReducer from './mirrorProReducer';

export default combineReducers({
  MirrorPro: mirrorProReducer,
});
