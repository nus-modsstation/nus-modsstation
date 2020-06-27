import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';
import moment from 'moment';

import { studyGroupActionType } from './studyGroup.type';
import {
  createGroupSuccess,
  createGroupError,
  updateStudyGroupReducer,
  sendJoinGroupSuccess,
  sendJoinGroupError,
  removeUserRequestSuccess,
  removeUserRequestError,
  acceptUserRequestSuccess,
  acceptUserRequestError,
} from './studyGroup.action';
import {
  addDocument,
  readDocumentsWhereContains,
  readDocumentsWhereEqual,
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
    console.log('payload: ', payload);
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
    console.log(error);
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
    console.log(error);
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
    yield put(sendJoinGroupSuccess(payload));
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
    // update the study group with the updated user requests
    yield put(removeUserRequestSuccess(payload));
  } catch (error) {
    yield put(removeUserRequestError(error));
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
    yield put(acceptUserRequestSuccess(payload));
  } catch (error) {
    yield put(acceptUserRequestError(error));
  }
}

export function* onAcceptUserRequest() {
  yield takeEvery(
    studyGroupActionType.ACCEPT_USER_REQUEST_START,
    acceptUserRequestGenerator
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
  ]);
}
