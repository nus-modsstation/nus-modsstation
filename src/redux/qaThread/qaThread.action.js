import { qaThreadActionType } from './qaThread.type';
//import { QAThread } from '../../models/QAThread';

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

export const readMyStarredQAThreads = (userId) => ({
  type: qaThreadActionType.READ_STARRED_THREADS,
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

export const visitQAThread = (qaThread) => ({
  type: qaThreadActionType.VISIT_THREAD,
  payload: qaThread,
});

export const starQAThread = (qaThread) => ({
  type: qaThreadActionType.STAR_THREAD_START,
  payload: qaThread,
});

export const starQAThreadSuccess = () => ({
  type: qaThreadActionType.STAR_THREAD_SUCCESS,
});

export const removeStarredQAThread = (qaThread) => ({
  type: qaThreadActionType.REMOVE_STARRED_THREAD_START,
  payload: qaThread,
});

export const removeStarredThreadSuccess = (qaThread) => ({
  type: qaThreadActionType.REMOVE_STARRED_THREAD_SUCCESS,
  payload: qaThread,
});

export const updateQAThreadPropPush = (qaThread) => ({
  type: qaThreadActionType.UPDATE_THREAD_PROP_PUSH,
  payload: qaThread,
});

export const updateQAThreadPropRemove = (qaThread) => ({
  type: qaThreadActionType.UPDATE_THREAD_PROP_REMOVE,
  payload: qaThread,
});
