import { qaThreadActionType } from './qaThread.type';

const INITIAL_STATE = {
  qaThreads: [],
  myThreads: [],
  error: null,
  createSuccess: false,
  updateSuccess: false,
  updateError: false,
};

export const qaThreadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case qaThreadActionType.CREATE_THREAD_SUCCESS:
      return {
        ...state,
        error: null,
        createSuccess: true,
      };
    case qaThreadActionType.CREATE_THREAD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case qaThreadActionType.CLEAR_THREAD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case qaThreadActionType.CLEAR_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: false,
      };
    case qaThreadActionType.UPDATE_THREAD_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
