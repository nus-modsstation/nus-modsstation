import { virtualGroupActionType } from './virtualGroup.type';

const INITIAL_STATE = {
  virtualGroups: [],
  myGroups: [],
  error: null,
  createSuccess: false,
  updateSuccess: false,
  updateError: false,
  sendRequestError: null,
  sendRequestSuccess: false,
};

export const virtualGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case virtualGroupActionType.CREATE_VIRTUAL_GROUP_SUCCESS:
      return {
        ...state,
        error: null,
        createSuccess: true,
        myGroups: [...state.myGroups, action.payload],
        [action.payload.moduleCode]: [
          ...state[action.payload.moduleCode],
          action.payload,
        ],
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
    case virtualGroupActionType.UPDATE_VIRTUAL_GROUP_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    case virtualGroupActionType.SEND_JOIN_REQUEST_SUCCESS:
      return {
        ...state,
        sendRequestSuccess: true,
        sendRequestError: null,
        // update the virtual group with the new user request
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
    case virtualGroupActionType.SEND_JOIN_REQUEST_ERROR:
      return {
        ...state,
        sendRequestError: action.payload,
        sendRequestSuccess: false,
      };
    case virtualGroupActionType.REMOVE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        // update the virtual group with the removed user request
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
    case virtualGroupActionType.UPDATE_VIRTUAL_GROUP_PROP_PUSH:
      return {
        ...state,
        // update the virtual group with the new prop
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (group) => {
            if (group.id === action.payload.id) {
              return {
                ...group,
                [action.payload.prop]: [
                  ...group[action.payload.prop],
                  action.payload.data,
                ],
              };
            }
            return group;
          }
        ),
      };
    case virtualGroupActionType.UPDATE_VIRTUAL_GROUP_PROP_REMOVE:
      return {
        ...state,
        // update the virtual group with the removed prop
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (group) => {
            if (group.id === action.payload.id) {
              return {
                ...group,
                [action.payload.prop]: [
                  ...group[action.payload.prop].filter(
                    (data) => data !== action.payload.data
                  ),
                ],
              };
            }
            return group;
          }
        ),
      };
    case virtualGroupActionType.REMOVE_MY_GROUP_BY_ID:
      return {
        ...state,
        myGroups: [
          ...state.myGroups.filter((group) => group.id !== action.payload),
        ],
      };
    case virtualGroupActionType.REMOVE_MODULE_GROUP_BY_ID:
      return {
        ...state,
        [action.payload.moduleCode]: [
          ...state[action.payload.moduleCode].filter(
            (group) => group.id !== action.payload.id
          ),
        ],
      };

    case virtualGroupActionType.DELETE_GROUP_ERROR:
      return {
        ...state,
        deleteGroupError: action.payload,
      };
    case virtualGroupActionType.LEAVE_GROUP_ERROR:
      return {
        ...state,
        leaveGroupError: action.payload,
      };
    case virtualGroupActionType.SWITCH_RECRUITING_MODE_SUCCESS:
      return {
        ...state,
        // update group under myGroups
        myGroups: state.myGroups.map((group) => {
          if (group.id === action.payload.id) {
            return {
              ...group,
              isPublic: !group.isPublic,
            };
          }
          return group;
        }),
        // update group under the moduleCode
        [action.payload.moduleCode]: state[action.payload.moduleCode].map(
          (group) => {
            if (group.id === action.payload.id) {
              return {
                ...group,
                isPublic: !group.isPublic,
              };
            }
            return group;
          }
        ),
      };
    case virtualGroupActionType.SWITCH_RECRUITING_MODE_ERROR:
      return {
        ...state,
        switchRecruitingModeError: action.payload,
      };
    default:
      return state;
  }
};
