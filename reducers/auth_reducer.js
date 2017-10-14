import {
  AUTH_SUCCESS,
  AUTH_FAIL
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { token: action.payload };

    case AUTH_FAIL:
      return { token: null };

    default:
      return state;
  }
}