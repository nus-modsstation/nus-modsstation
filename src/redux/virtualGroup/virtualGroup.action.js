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

export const updateVirtualGroup = (data) => ({
  type: virtualGroupActionType.UPDATE_VIRTUAL_GROUP_START,
  payload: data,
});

export const updateVirtualGroupSuccess = (data) => ({
  type: virtualGroupActionType.UPDATE_VIRTUAL_GROUP_SUCCESS,
  payload: data,
});

export const updateVirtualGroupError = (error) => ({
  type: virtualGroupActionType.UPDATE_VIRTUAL_GROUP_ERROR,
  payload: error,
});

export const clearOnUpdateSuccess = () => ({
  type: virtualGroupActionType.CLEAR_UPDATE_SUCCESS,
});

export const clearUpdateError = () => ({
  type: virtualGroupActionType.CLEAR_UPDATE_ERROR,
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
