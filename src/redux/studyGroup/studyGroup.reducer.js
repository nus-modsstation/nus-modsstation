import { studyGroupActionType } from './studyGroup.type';

const INITIAL_STATE = {
  studyGroups: [],
  myGroups: [],
  createSuccess: false,
  error: null,
  sendRequestError: null,
  sendRequestSuccess: false,
};

export const studyGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case studyGroupActionType.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        error: null,
        myGroups: [...state.myGroups, action.payload],
        [action.payload.moduleCode]: [
          ...state[action.payload.moduleCode],
          action.payload,
        ],
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
    case studyGroupActionType.UPDATE_STUDY_GROUP_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    case studyGroupActionType.SEND_JOIN_GROUP_SUCCESS:
      return {
        ...state,
        sendRequestError: null,
        sendRequestSuccess: true,
        // update the study group with the new user request
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (group) => {
            if (group.id === action.payload.id) {
              return {
                ...group,
                userRequests: [...group.userRequests, action.payload.data],
              };
            }
            return group;
          }
        ),
      };
    case studyGroupActionType.SEND_JOIN_GROUP_ERROR:
      return {
        ...state,
        sendRequestError: action.payload,
        sendRequestSuccess: false,
      };
    case studyGroupActionType.REMOVE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        // update the study group with the removed user request
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (group) => {
            if (group.id === action.payload.id) {
              return {
                ...group,
                userRequests: [
                  ...group.userRequests.filter(
                    (userId) => userId !== action.payload.data
                  ),
                ],
              };
            }
            return group;
          }
        ),
      };
    case studyGroupActionType.ACCEPT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        // update the study group with the new user request
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (group) => {
            if (group.id === action.payload.id) {
              return {
                ...group,
                [action.payload.prop]: [...group.prop, action.payload.data],
              };
            }
            return group;
          }
        ),
      };
    default:
      return state;
  }
};
