import { userActionType } from './user.type';

const INITIAL_STATE = {
  currentUser: null,
  isFetching: false,
  authError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
};

export default userReducer;
