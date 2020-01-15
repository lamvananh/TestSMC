
import { LOGIN,LOGIN_SUCCESS,LOGIN_ERROR } from './constants';

export function login(data) {
  return {
    type: LOGIN,
    data
  };
}

export function loginSuccess(userData) {
  return {
    type: LOGIN_SUCCESS,
    userData,
  };
}


export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}