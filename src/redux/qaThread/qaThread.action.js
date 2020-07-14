import { qaThreadActionType } from './qaThread.type';

export const clearData = () => ({
  type: qaThreadActionType.CLEAR_DATA,
});

export const createQAThreadStart = (qaThread) => ({
  type: qaThreadActionType.CREATE_THREAD_START,
  payload: qaThread,
});

export const createQAThreadSuccess = (qaThread) => ({
  type: qaThreadActionType.CREATE_THREAD_SUCCESS,
  payload: qaThread,
});

export const createQAThreadError = (errorMessage) => ({
  type: qaThreadActionType.CREATE_THREAD_ERROR,
  payload: errorMessage,
});

export const clearQAThreadError = () => ({
  type: qaThreadActionType.CLEAR_THREAD_ERROR,
});

export const clearOnCreateSuccess = () => ({
  type: qaThreadActionType.CLEAR_CREATE_SUCCESS,
});

export const searchThread = (searchQuery) => ({
  type: qaThreadActionType.SEARCH_THREAD,
  payload: searchQuery,
});

export const updateQAThreadReducer = (data) => ({
  type: qaThreadActionType.UPDATE_THREAD_REDUCER,
  payload: data,
});

export const readMyQAThreads = (userId) => ({
  type: qaThreadActionType.READ_MY_THREADS,
  payload: userId,
});

export const readQAThreadsByModule = (moduleCode) => ({
  type: qaThreadActionType.READ_THREADS_BY_MODULE,
  payload: moduleCode,
});

export const listenMyQAThreads = (userId) => ({
  type: qaThreadActionType.LISTEN_MY_THREAD,
  payload: userId,
});
