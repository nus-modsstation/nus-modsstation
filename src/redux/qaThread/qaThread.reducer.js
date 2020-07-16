import { qaThreadActionType } from './qaThread.type';

const INITIAL_STATE = {
  qaThreads: [],
  myThreads: [],
  starredThreads: [],
  currentThread: null,
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
        myThreads: [...state.myThreads, action.payload],
        [action.payload.moduleCode]: [
          ...state[action.payload.moduleCode],
          action.payload,
        ],
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
    case qaThreadActionType.UPDATE_THREAD_PROP_PUSH:
      return {
        ...state,
        // update the thread with the new prop
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (thread) => {
            if (thread.id === action.payload.id) {
              return {
                ...thread,
                [action.payload.prop]: [
                  ...thread[action.payload.prop],
                  action.payload.data,
                ],
              };
            }
            return thread;
          }
        ),
      };
    case qaThreadActionType.UPDATE_THREAD_PROP_REMOVE:
      return {
        ...state,
        // update the thread with the removed prop
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (thread) => {
            if (thread.id === action.payload.id) {
              return {
                ...thread,
                [action.payload.prop]: [
                  ...thread[action.payload.prop].filter(
                    (data) => data !== action.payload.data
                  ),
                ],
              };
            }
            return thread;
          }
        ),
      };
    case qaThreadActionType.STAR_THREAD_SUCCESS:
      return {
        ...state,
        starredThreads: state.currentThread
          ? [...state.starredThreads, state.currentThread]
          : state.starredThreads,
        currentThread: null,
      };
    case qaThreadActionType.REMOVE_STARRED_THREAD_SUCCESS:
      return {
        ...state,
        starredThreads: state.starredThreads.filter(
          (thread) => thread.id !== action.payload.id
        ),
      };
    case qaThreadActionType.VISIT_THREAD:
      return {
        ...state,
        currentThread:
          state.starredThreads.filter(
            (thread) => thread.id === action.payload.id
          ).length > 0
            ? state.currentThread
            : action.payload,
      };
    default:
      return state;
  }
};
