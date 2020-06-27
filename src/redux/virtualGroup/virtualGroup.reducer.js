import { virtualGroupActionType } from './virtualGroup.type';

const INITIAL_STATE = {
  virtualGroups: [],
  myGroups: [],
  error: null,
  createSuccess: false,
  updateSuccess: false,
  updateError: false,
};

export const virtualGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case virtualGroupActionType.CREATE_VIRTUAL_GROUP_SUCCESS:
      return {
        ...state,
        error: null,
        createSuccess: true,
      };
    case virtualGroupActionType.CREATE_VIRTUAL_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case virtualGroupActionType.CLEAR_VIRTUAL_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case virtualGroupActionType.CLEAR_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: false,
      };
    case virtualGroupActionType.UPDATE_VIRTUAL_GROUP_START:
      return {
        ...state,
        ...action.payload,
      };
    case virtualGroupActionType.UPDATE_VIRTUAL_GROUP_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
        updateError: false,
      };
    case virtualGroupActionType.CLEAR_UPDATE_SUCCESS: {
      return {
        ...state,
        updateSuccess: true,
      };
    }
    case virtualGroupActionType.UPDATE_VIRTUAL_GROUP_ERROR:
      return {
        ...state,
        updateError: action.payload,
      };
    case virtualGroupActionType.CLEAR_UPDATE_ERROR:
      return {
        ...state,
        updateError: false,
      };
    default:
      return state;
  }
};
