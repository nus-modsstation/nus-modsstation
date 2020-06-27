import { studyGroupActionType } from './studyGroup.type';

export const clearData = () => ({
  type: studyGroupActionType.CLEAR_DATA,
});

export const createGroupStart = (studyGroup) => ({
  type: studyGroupActionType.CREATE_GROUP_START,
  payload: studyGroup,
});

export const createGroupSuccess = (studyGroup) => ({
  type: studyGroupActionType.CREATE_GROUP_SUCCESS,
  payload: studyGroup,
});

export const createGroupError = (errorMessage) => ({
  type: studyGroupActionType.CREATE_GROUP_ERROR,
  payload: errorMessage,
});

export const clearGroupError = () => ({
  type: studyGroupActionType.CLEAR_GROUP_ERROR,
});

export const clearCreateSuccess = () => ({
  type: studyGroupActionType.CLEAR_CREATE_SUCCESS,
});

export const searchGroup = (searchQuery) => ({
  type: studyGroupActionType.SEARCH_GROUP,
  payload: searchQuery,
});

export const updateStudyGroupReducer = (data) => ({
  type: studyGroupActionType.UPDATE_STUDY_GROUP_REDUCER,
  payload: data,
});

export const readMyGroups = (userId) => ({
  type: studyGroupActionType.READ_MY_GROUPS,
  payload: userId,
});

export const readGroupsByModule = (moduleCode) => ({
  type: studyGroupActionType.READ_GROUPS_BY_MODULE,
  payload: moduleCode,
});

export const listenMyGroup = (userId) => ({
  type: studyGroupActionType.LISTEN_MY_GROUP,
  payload: userId,
});

export const sendJoinGroupStart = (studyGroup) => ({
  type: studyGroupActionType.SEND_JOIN_GROUP_START,
  payload: studyGroup,
});

export const sendJoinGroupSuccess = (studyGroup) => ({
  type: studyGroupActionType.SEND_JOIN_GROUP_SUCCESS,
  payload: studyGroup,
});

export const sendJoinGroupError = (errorMessage) => ({
  type: studyGroupActionType.SEND_JOIN_GROUP_ERROR,
  payload: errorMessage,
});

export const acceptUserRequestStart = (studyGroup) => ({
  type: studyGroupActionType.ACCEPT_USER_REQUEST_START,
  payload: studyGroup,
});

export const acceptUserRequestSuccess = (studyGroup) => ({
  type: studyGroupActionType.ACCEPT_USER_REQUEST_SUCCESS,
  payload: studyGroup,
});

export const acceptUserRequestError = (errorMessage) => ({
  type: studyGroupActionType.ACCEPT_USER_REQUEST_ERROR,
  payload: errorMessage,
});

export const removeUserRequestStart = (studyGroup) => ({
  type: studyGroupActionType.REMOVE_USER_REQUEST_START,
  payload: studyGroup,
});

export const removeUserRequestSuccess = (studyGroup) => ({
  type: studyGroupActionType.REMOVE_USER_REQUEST_SUCCESS,
  payload: studyGroup,
});

export const removeUserRequestError = (errorMessage) => ({
  type: studyGroupActionType.REMOVE_USER_REQUEST_ERROR,
  payload: errorMessage,
});
