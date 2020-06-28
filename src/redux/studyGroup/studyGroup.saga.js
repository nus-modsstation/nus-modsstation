import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';
import moment from 'moment';

import { studyGroupActionType } from './studyGroup.type';
import {
  createGroupSuccess,
  createGroupError,
  updateStudyGroupReducer,
  sendJoinGroupError,
  removeUserRequestSuccess,
  updateStudyGroupPropPush,
  updateStudyGroupPropRemove,
  removeMyGroupById,
  removeModuleGroupById,
} from './studyGroup.action';
import {
  addDocument,
  deleteDocument,
  readDocumentsWhereContains,
  readDocumentsWhereEqual,
  readDocumentsWhereIn,
  updateDocumentArrayUnion,
  updateDocumentArrayRemove,
} from '../../services/firestore';

const collectionName = 'studyGroups';

// convert Firestore Timestamp to Moment for studyGroups
const convertGroupsTimestampToDate = (studyGroups) => {
  return studyGroups.map((studyGroup) => {
    return {
      ...studyGroup,
      startTime: moment(studyGroup.startTime.toDate()),
      endTime: moment(studyGroup.endTime.toDate()),
    };
  });
};

export function* createGroupGenerator({ payload }) {
  try {
    yield addDocument({
      collection: collectionName,
      data: payload,
      setId: true,
    });
    // fetch module groups and my groups after create Success
    yield put(createGroupSuccess(payload));
  } catch (error) {
    yield put(createGroupError(error));
  }
}

export function* onCreateGroup() {
  yield takeLatest(
    studyGroupActionType.CREATE_GROUP_START,
    createGroupGenerator
  );
}

export function* readMyGroupsGenarator({ payload }) {
  try {
    let studyGroups = yield readDocumentsWhereContains({
      collection: collectionName,
      arrayName: 'users',
      fieldValue: payload,
    });
    studyGroups = convertGroupsTimestampToDate(studyGroups);
    const data = {
      myGroups: studyGroups,
    };
    yield put(updateStudyGroupReducer(data));
  } catch (error) {
    const data = {
      readMyGroupsError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onReadMyGroups() {
  yield takeLatest(studyGroupActionType.READ_MY_GROUPS, readMyGroupsGenarator);
}

export function* readGroupsByModuleGenarator({ payload }) {
  try {
    let studyGroups = yield readDocumentsWhereEqual({
      collection: collectionName,
      fieldName: 'moduleCode',
      fieldValue: payload,
    });
    studyGroups = convertGroupsTimestampToDate(studyGroups);
    const data = {
      [payload]: studyGroups,
    };
    yield put(updateStudyGroupReducer(data));
  } catch (error) {
    const data = {
      readGroupsByModuleError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onReadGroupsByModule() {
  yield takeEvery(
    studyGroupActionType.READ_GROUPS_BY_MODULE,
    readGroupsByModuleGenarator
  );
}

export function* sendJoinGroupGenerator({ payload }) {
  try {
    yield updateDocumentArrayUnion({
      collection: collectionName,
      docId: payload.id,
      field: 'userRequests',
      data: payload.data,
    });
    // update the study group with the new user request
    payload.prop = 'userRequests';
    yield put(updateStudyGroupPropPush(payload));
  } catch (error) {
    yield put(sendJoinGroupError(error));
  }
}

export function* onSendJoinGroup() {
  yield takeEvery(
    studyGroupActionType.SEND_JOIN_GROUP_START,
    sendJoinGroupGenerator
  );
}

export function* removeUserRequestGenerator({ payload }) {
  try {
    yield updateDocumentArrayRemove({
      collection: collectionName,
      docId: payload.id,
      field: 'userRequests',
      data: payload.data,
    });
    // update the study group with the removed user requests
    yield put(removeUserRequestSuccess(payload));
  } catch (error) {
    const data = {
      removeRequestError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onRemoveUserRequest() {
  yield takeEvery(
    studyGroupActionType.REMOVE_USER_REQUEST_START,
    removeUserRequestGenerator
  );
}

export function* acceptUserRequestGenerator({ payload }) {
  try {
    yield updateDocumentArrayUnion({
      collection: collectionName,
      docId: payload.id,
      field: 'users',
      data: payload.data,
    });
    // update the study group with the new accepted user
    // and updated user requests
    payload.prop = 'users';
    yield put(updateStudyGroupPropPush(payload));
  } catch (error) {
    const data = {
      acceptRequestError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onAcceptUserRequest() {
  yield takeEvery(
    studyGroupActionType.ACCEPT_USER_REQUEST_START,
    acceptUserRequestGenerator
  );
}

export function* leaveGroupGenerator({ payload }) {
  try {
    yield updateDocumentArrayRemove({
      collection: collectionName,
      docId: payload.id,
      field: 'users',
      data: payload.data,
    });
    // update the study group with the leave users
    payload.prop = 'users';
    yield put(updateStudyGroupPropRemove(payload));
    // remove the group from my groups
    yield put(removeMyGroupById(payload.id));
  } catch (error) {
    const data = {
      leaveGroupError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onLeaveGroup() {
  yield takeEvery(studyGroupActionType.LEAVE_GROUP_START, leaveGroupGenerator);
}

export function* deleteGroupGenerator({ payload }) {
  try {
    yield deleteDocument({
      collection: collectionName,
      docId: payload.id,
    });
    // remove the group from my groups
    yield put(removeMyGroupById(payload.id));
    // remove the group from module groups
    yield put(removeModuleGroupById(payload));
  } catch (error) {
    const data = {
      deleteGroupError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onDeleteGroup() {
  yield takeEvery(
    studyGroupActionType.DELETE_GROUP_START,
    deleteGroupGenerator
  );
}

export function* searchGroupGenarator({ payload }) {
  try {
    let studyGroups = yield readDocumentsWhereIn({
      collection: collectionName,
      fieldName: payload.fieldName,
      fieldValue: payload.fieldValue,
      fieldNames: payload.fieldNames,
      fieldValues: payload.fieldValues,
    });
    studyGroups = convertGroupsTimestampToDate(studyGroups);
    const data = {
      searchResults: studyGroups,
    };
    yield put(updateStudyGroupReducer(data));
  } catch (error) {
    const data = {
      searchGroupError: error,
    };
    yield put(updateStudyGroupReducer(data));
  }
}

export function* onSearchGroup() {
  yield takeLatest(
    studyGroupActionType.SEARCH_GROUP_START,
    searchGroupGenarator
  );
}

export function* studyGroupSaga() {
  yield all([
    call(onCreateGroup),
    call(onReadMyGroups),
    call(onReadGroupsByModule),
    call(onSendJoinGroup),
    call(onRemoveUserRequest),
    call(onAcceptUserRequest),
    call(onLeaveGroup),
    call(onDeleteGroup),
    call(onSearchGroup),
  ]);
}
