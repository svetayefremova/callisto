import {
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAIL,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_FAIL
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.photos
      };

    case ADD_PHOTO_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, action.photo]
      };

    case FETCH_PHOTOS_FAIL:
    case ADD_PHOTO_FAIL:
      return { error: action.error };

    default:
      return state;
  }
}