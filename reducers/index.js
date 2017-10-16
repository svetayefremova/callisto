import { combineReducers } from 'redux';
import auth from './auth_reducer';
import photos from './photos_reducer';
import profile from './profile_reducer';

export default combineReducers({
  auth,
  photos,
  profile
});