import { takeLatest, put, all, call } from 'redux-saga/effects';

import { User } from '../../models/User';
import { userActionType } from './user.type';
import {
  loginSuccess,
  loginError,
  logoutSuccess,
  logoutError,
  registerError,
  updateUserSuccess,
  updateUserError,
} from './user.action';
import {
  login,
  logout,
  register,
  getCurrentUser,
} from '../../services/userAuth';
import { addDocument, updateDocument } from '../../services/firestore';

const collectionName = 'users';

export function* storeUserToReducer(user) {
  const currentUser = User.toJson(user);
  yield put(loginSuccess(currentUser));
}

export function* storeUserToFirestore(user) {
  try {
    yield addDocument({
      collection: collectionName,
      data: User.toJson(user),
      setId: false,
      docId: user.uid,
    });
    yield storeUserToReducer(user);
  } catch (error) {
    yield put(registerError(error));
  }
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
    yield storeUserToFirestore(user);
  } catch (error) {
    yield put(registerError(error));
  }
}

export function* isUserAuthenticated() {
  try {
    console.log('isUserAuthenticated');
    const user = yield getCurrentUser();
    console.log('user: ', user);
    if (!user) return;
    yield storeUserToReducer(user);
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* updateUserGenerator({ payload }) {
  try {
    yield updateDocument({
      collection: collectionName,
      docId: payload.id,
      data: payload.data,
    });
    console.log('payload.data: ', payload.data);
    yield put(updateUserSuccess(payload.data));
  } catch (error) {
    yield put(updateUserError(error));
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

export function* onUpdateUser() {
  yield takeLatest(userActionType.UPDATE_USER_START, updateUserGenerator);
}

export function* userSaga() {
  yield all([
    call(onLoginStart),
    call(onLogoutStart),
    call(onRegisterStart),
    call(onUpdateUser),
  ]);
}
