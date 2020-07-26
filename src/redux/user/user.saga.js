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
import {
  addDocument,
  updateDocument,
  readDocument,
} from '../../services/firestore';

const collectionName = 'users';

export function* storeUserToReducer(userData) {
  yield put(loginSuccess(userData));
}

// call after user is registered
// to store user data in Firestore
export function* storeUserToFirestore(user) {
  try {
    const userData = User.toJson(user);
    // set firstLogin to true
    // for showing carousel
    userData.firstLogin = true;
    yield addDocument({
      collection: collectionName,
      data: userData,
      setId: false,
      docId: userData.id,
    });
    // redirect to login page
    // ensure user verify their email first
    //yield storeUserToReducer(userData);
  } catch (error) {
    yield put(registerError(error));
  }
}

export function* loginGenerator({ payload }) {
  try {
    const { user } = yield login(payload);
    // fetch user from Firestore and store it in reducer
    const userData = yield readDocument({
      collection: collectionName,
      docId: user.uid,
    });
    yield storeUserToReducer(userData);
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
    const user = yield getCurrentUser();
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
