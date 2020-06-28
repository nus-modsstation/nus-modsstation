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
    case virtualGroupActionType.ACCEPT_USER_REQUEST_SUCCESS:
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
