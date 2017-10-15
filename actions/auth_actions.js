import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  AUTH_SUCCESS,
  AUTH_FAIL
} from './types';

export const facebookAuth = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    dispatch({ type: AUTH_SUCCESS, payload: token })
  } else {
    logIn(dispatch);
  }
};

const logIn = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1247053935400675', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: 'AUTH_FAIL'})
  }

  if (type === 'success') {
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: 'AUTH_SUCCESS', payload: token });
  }
};