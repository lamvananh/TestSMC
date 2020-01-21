import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constants';
import LOGIN_API from "../apiUrl"
import { loginSuccess, loginError } from './actions';
import request from 'utils/request';
const axios = require('axios');


export function* getUserData(action) {
  const axiosConfig = {
    method: 'post',
    url: LOGIN_API,
    withCredentials: true,
    data: {
      userName: action.data.userName,
      password: action.data.password
    }
  }

  try {
    const userData = yield call(axios, axiosConfig);
    yield put(loginSuccess(userData));
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(LOGIN, getUserData);
}
