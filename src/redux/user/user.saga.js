import { takeLatest, put, all, call } from 'redux-saga/effects';

import { userActionType } from './user.type';
import {
  loginSuccess,
  loginError,
  logoutSuccess,
  logoutError,
  registerError,
} from './user.action';
import {
  login,
  logout,
  register,
  getCurrentUser,
} from '../../services/userAuth';

export function* storeUserToReducer(user) {
  yield put(
    loginSuccess({
      id: user.uid,
      email: user.email,
      username: user.displayName,
      isVerified: user.emailVerified,
    })
  );
}

export function* loginGenerator({ payload }) {
  try {
    const { user } = yield login(payload);
    yield storeUserToReducer(user);
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* logoutGenerator() {
  try {
    yield logout();
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
  }
}

export function* registerGenerator({ payload }) {
  try {
    const { user } = yield register(payload);
    yield storeUserToReducer(user);
  } catch (error) {
    yield put(registerError(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield storeUserToReducer(user);
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* onLoginStart() {
  yield takeLatest(userActionType.LOGIN_START, loginGenerator);
}

export function* onLogoutStart() {
  yield takeLatest(userActionType.LOGOUT_START, logoutGenerator);
}

export function* onRegisterStart() {
  yield takeLatest(userActionType.REGISTER_START, registerGenerator);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionType.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([call(onLoginStart), call(onLogoutStart), call(onRegisterStart)]);
}
