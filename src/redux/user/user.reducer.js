import { userActionType } from './user.type';

const INITIAL_STATE = {
  currentUser: null,
  isFetching: false,
  authError: null,
  updateSuccess: false,
  updateError: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.LOGIN_START:
    case userActionType.LOGOUT_START:
    case userActionType.REGISTER_START:
      return {
        ...state,
        isFetching: true,
      };
    case userActionType.LOGIN_SUCCESS:
    case userActionType.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: action.payload,
        authError: null,
      };
    case userActionType.LOGIN_ERROR:
    case userActionType.LOGOUT_ERROR:
    case userActionType.REGISTER_ERROR:
      return {
        ...state,
        isFetching: false,
        authError: action.payload,
      };
    case userActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isFetching: false,
        authError: null,
      };
    case userActionType.CLEAR_AUTH_ERROR:
      return {
        ...state,
        authError: null,
      };
    case userActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
        updateError: false,
        currentUser: { ...state.currentUser, ...action.payload },
      };
    case userActionType.CLEAR_UPDATE_SUCCESS:
      return {
        ...state,
        updateSuccess: false,
      };
    case userActionType.UPDATE_USER_ERROR:
      return {
        ...state,
        updateError: action.payload,
      };
    case userActionType.CLEAR_UPDATE_ERROR:
      return {
        ...state,
        updateError: false,
      };
    case userActionType.ACCEPT_REQUEST_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friendRequests: state.currentUser.friendRequests.filter(
            (request) => request !== action.payload
          ),
          friends: [...state.currentUser.friends, action.payload],
        },
      };
    case userActionType.REMOVE_REQUEST_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friendRequests: state.currentUser.friendRequests.filter(
            (request) => request !== action.payload
          ),
        },
      };
    case userActionType.REMOVE_FRIEND_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          friends: state.currentUser.friends.filter(
            (request) => request !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
