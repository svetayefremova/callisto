import { AsyncStorage } from 'react-native';
import { FileSystem } from 'expo';
import uuidv1 from 'uuid/v1';

import {
  FETCH_AVATAR_SUCCESS,
  FETCH_AVATAR_FAIL,
  ADD_AVATAR_SUCCESS,
  ADD_AVATAR_FAIL
} from './types';

const DIR_URL = FileSystem.documentDirectory + 'profile/';

export const fetchAvatar = () => async dispatch => {
  const avatar = await AsyncStorage.getItem('avatar');

  if (avatar) {
    dispatch({ type: FETCH_AVATAR_SUCCESS, avatar })
  } else {
    dispatch({ type: FETCH_AVATAR_FAIL })
  }
};

export const addAvatar = (imageUri) => async dispatch => {
  try {
    const avatar = `Avatar_${uuidv1()}.jpg`;

    await Promise.all([
      FileSystem.moveAsync({
        from: imageUri,
        to: DIR_URL + avatar,
      }),
      AsyncStorage.setItem('avatar', avatar)
    ]);

    dispatch({ type: ADD_AVATAR_SUCCESS, avatar })
  } catch(e) {
    dispatch({ type: ADD_AVATAR_FAIL })
  }
};