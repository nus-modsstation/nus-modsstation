import { studyGroupActionType } from './studyGroup.type';

const INITIAL_STATE = {
  studyGroups: [],
  myGroups: [],
  createSuccess: false,
  error: null,
  sendRequestError: null,
  sendRequestSuccess: false,
  searchResults: null,
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
    case studyGroupActionType.UPDATE_STUDY_GROUP_PROP_PUSH:
      return {
        ...state,
        // update the study group with the new prop
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
    case studyGroupActionType.UPDATE_STUDY_GROUP_PROP_REMOVE:
      return {
        ...state,
        // update the study group with the removed prop
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
    case studyGroupActionType.REMOVE_MY_GROUP_BY_ID:
      return {
        ...state,
        myGroups: [
          ...state.myGroups.filter((group) => group.id !== action.payload),
        ],
      };
    case studyGroupActionType.REMOVE_MODULE_GROUP_BY_ID:
      return {
        ...state,
        [action.payload.moduleCode]: [
          ...state[action.payload.moduleCode].filter(
            (group) => group.id !== action.payload.id
          ),
        ],
      };
    case studyGroupActionType.FILTER_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [
          ...state.searchResults.filter((result) => {
            return (
              (action.payload.moduleCodes.length === 0 ||
                (action.payload.moduleCodes.length > 0 &&
                  action.payload.moduleCodes.includes(result.moduleCode))) &&
              (action.payload.locations.length === 0 ||
                (action.payload.locations.length > 0 &&
                  action.payload.locations.includes(result.location)))
            );
          }),
        ],
      };
    case studyGroupActionType.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: null,
      };
    default:
      return state;
  }
};
