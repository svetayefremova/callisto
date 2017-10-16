import {
  ADD_AVATAR_SUCCESS,
  ADD_AVATAR_FAIL,
  FETCH_AVATAR_SUCCESS,
  FETCH_AVATAR_FAIL
} from '../actions/types';

export default (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_AVATAR_SUCCESS:
    case FETCH_AVATAR_SUCCESS:
      return { avatar: action.avatar};

    case FETCH_AVATAR_FAIL:
      return { avatar: null };

    case ADD_AVATAR_FAIL:
      return { error: action.error };

    default:
      return state;
  }
}