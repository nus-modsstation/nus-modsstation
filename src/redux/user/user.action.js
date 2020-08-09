import { userActionType } from './user.type';

export const loginStart = (userCredentials) => ({
  type: userActionType.LOGIN_START,
  payload: userCredentials,
});

export const loginSuccess = (user) => ({
  type: userActionType.LOGIN_SUCCESS,
  payload: user,
});

export const loginError = (errorMessage) => ({
  type: userActionType.LOGIN_ERROR,
  payload: errorMessage,
});

export const logoutStart = () => ({
  type: userActionType.LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: userActionType.LOGOUT_SUCCESS,
});

export const logoutError = () => ({
  type: userActionType.LOGOUT_ERROR,
});

export const registerStart = (userCredentials) => ({
  type: userActionType.REGISTER_START,
  payload: userCredentials,
});

export const registerSuccess = (user) => ({
  type: userActionType.REGISTER_SUCCESS,
  payload: user,
});

export const registerError = (errorMessage) => ({
  type: userActionType.REGISTER_ERROR,
  payload: errorMessage,
});

export const checkUserSession = () => ({
  type: userActionType.CHECK_USER_SESSION,
});

export const clearAuthError = () => ({
  type: userActionType.CLEAR_AUTH_ERROR,
});

export const updateUserStart = (data) => ({
  type: userActionType.UPDATE_USER_START,
  payload: data,
});

export const updateUserSuccess = (data) => ({
  type: userActionType.UPDATE_USER_SUCCESS,
  payload: data,
});

export const updateUserError = (error) => ({
  type: userActionType.UPDATE_USER_ERROR,
  payload: error,
});

export const clearUpdateSuccess = () => ({
  type: userActionType.CLEAR_UPDATE_SUCCESS,
});

export const clearUpdateError = () => ({
  type: userActionType.CLEAR_UPDATE_ERROR,
});

export const acceptRequestStart = (data) => ({
  type: userActionType.ACCEPT_REQUEST_START,
  payload: data,
});

export const acceptRequestSuccess = (data) => ({
  type: userActionType.ACCEPT_REQUEST_SUCCESS,
  payload: data,
});

export const removeRequestStart = (data) => ({
  type: userActionType.REMOVE_REQUEST_START,
  payload: data,
});

export const removeRequestSuccess = (data) => ({
  type: userActionType.REMOVE_REQUEST_SUCCESS,
  payload: data,
});

export const removeFriendStart = (data) => ({
  type: userActionType.REMOVE_FRIEND_START,
  payload: data,
});

export const removeFriendSuccess = (data) => ({
  type: userActionType.REMOVE_FRIEND_SUCCESS,
  payload: data,
});

export const fetchUserStart = (data) => ({
  type: userActionType.FETCH_USER_START,
  payload: data,
});
