import { studyGroupActionType } from './studyGroup.type';

const INITIAL_STATE = {
  studyGroups: [],
  myGroups: [],
  error: null,
  createSuccess: false,
};

export const studyGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case studyGroupActionType.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        error: null,
        createSuccess: true,
      };

    case studyGroupActionType.CREATE_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case studyGroupActionType.CLEAR_GROUP_ERROR:
      return {
        ...state,
        error: null,
      };
    case studyGroupActionType.CLEAR_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: false,
      };
    case studyGroupActionType.UPDATE_STUDY_GROUP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
