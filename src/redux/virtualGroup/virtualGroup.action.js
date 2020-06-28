import { virtualGroupActionType } from './virtualGroup.type';

export const clearData = () => ({
  type: virtualGroupActionType.CLEAR_DATA,
});

export const createVirtualGroupStart = (virtualGroup) => ({
  type: virtualGroupActionType.CREATE_VIRTUAL_GROUP_START,
  payload: virtualGroup,
});

export const createVirtualGroupSuccess = (virtualGroup) => ({
  type: virtualGroupActionType.CREATE_VIRTUAL_GROUP_SUCCESS,
  payload: virtualGroup,
});

export const createVirtualGroupError = (errorMessage) => ({
  type: virtualGroupActionType.CREATE_VIRTUAL_GROUP_ERROR,
  payload: errorMessage,
});

export const clearVirtualGroupError = () => ({
  type: virtualGroupActionType.CLEAR_VIRTUAL_GROUP_ERROR,
});

export const clearOnCreateSuccess = () => ({
  type: virtualGroupActionType.CLEAR_CREATE_SUCCESS,
});

export const searchGroup = (searchQuery) => ({
  type: virtualGroupActionType.SEARCH_GROUP,
  payload: searchQuery,
});

export const updateVirtualGroupReducer = (data) => ({
  type: virtualGroupActionType.UPDATE_VIRTUAL_GROUP_REDUCER,
  payload: data,
});

export const readMyVirtualGroups = (userId) => ({
  type: virtualGroupActionType.READ_MY_VIRTUAL_GROUPS,
  payload: userId,
});

export const readVirtualGroupsByModule = (moduleCode) => ({
  type: virtualGroupActionType.READ_VIRTUAL_GROUPS_BY_MODULE,
  payload: moduleCode,
});

export const listenMyVirtualGroup = (userId) => ({
  type: virtualGroupActionType.LISTEN_MY_VIRTUAL_GROUP,
  payload: userId,
});

export const sendJoinRequestStart = (virtualGroup) => ({
  type: virtualGroupActionType.SEND_JOIN_REQUEST_START,
  payload: virtualGroup,
});

export const sendJoinRequestSuccess = (virtualGroup) => ({
  type: virtualGroupActionType.SEND_JOIN_REQUEST_SUCCESS,
  payload: virtualGroup,
});

export const sendJoinRequestError = (errorMessage) => ({
  type: virtualGroupActionType.SEND_JOIN_REQUEST_ERROR,
  payload: errorMessage,
});

export const acceptUserRequestStart = (virtualGroup) => ({
  type: virtualGroupActionType.ACCEPT_USER_REQUEST_START,
  payload: virtualGroup,
});

export const acceptUserRequestSuccess = (virtualGroup) => ({
  type: virtualGroupActionType.ACCEPT_USER_REQUEST_SUCCESS,
  payload: virtualGroup,
});

export const acceptUserRequestError = (errorMessage) => ({
  type: virtualGroupActionType.ACCEPT_USER_REQUEST_ERROR,
  payload: errorMessage,
});

export const removeUserRequestStart = (virtualGroup) => ({
  type: virtualGroupActionType.REMOVE_USER_REQUEST_START,
  payload: virtualGroup,
});

export const removeUserRequestSuccess = (virtualGroup) => ({
  type: virtualGroupActionType.REMOVE_USER_REQUEST_SUCCESS,
  payload: virtualGroup,
});

export const removeUserRequestError = (errorMessage) => ({
  type: virtualGroupActionType.REMOVE_USER_REQUEST_ERROR,
  payload: errorMessage,
});
