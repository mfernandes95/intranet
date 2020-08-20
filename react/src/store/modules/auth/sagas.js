import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { username, password } = payload;

    const response = yield call(api.post, '/admins/sessions', {
      username,
      password,
    });

    const { token, admins } = response.data;

    api.defaults.headers['Authorization'] = `Bearer ${token}`;


    // if (!employee.admin) {
    //   console.tron.error('Usuário não é admin');
    // }

    yield put(signInSuccess(token, admins));

    history.push('dashboard/admin');
  } catch (err) {
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
