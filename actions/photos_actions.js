import { FileSystem } from 'expo';
import uuidv1 from 'uuid/v1';

import {
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAIL,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_FAIL
} from './types';

const DIR_URL = FileSystem.documentDirectory + 'photos/';

export const fetchPhotos = () => async dispatch => {
  try {
    const photos = await FileSystem.readDirectoryAsync(DIR_URL);
    dispatch({ type: FETCH_PHOTOS_SUCCESS, photos })
  } catch (error) {
    dispatch({ type: FETCH_PHOTOS_FAIL, error })
  }
};

export const addPhoto = (image) => async dispatch => {
  const photo = `Photo_${uuidv1()}.jpg`;

  try {
    await FileSystem.moveAsync({
      from: image.uri,
      to: DIR_URL + photo,
    });

    dispatch({ type: ADD_PHOTO_SUCCESS, photo });

  } catch(error) {
    dispatch({ type: ADD_PHOTO_FAIL, error });
  }
};