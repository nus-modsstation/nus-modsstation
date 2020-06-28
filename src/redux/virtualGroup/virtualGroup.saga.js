import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';

import { virtualGroupActionType } from './virtualGroup.type';
import {
  createVirtualGroupSuccess,
  createVirtualGroupError,
  updateVirtualGroupReducer,
  sendJoinRequestSuccess,
  sendJoinRequestError,
  removeUserRequestSuccess,
  removeUserRequestError,
  acceptUserRequestSuccess,
  acceptUserRequestError,
} from './virtualGroup.action';
import {
  addDocument,
  readDocumentsWhereContains,
  readDocumentsWhereEqual,
  updateDocumentArrayUnion,
  updateDocumentArrayRemove,
} from '../../services/firestore';

const collectionName = 'virtualGroups';

export function* createVirtualGroupGenerator({ payload }) {
  try {
    yield addDocument({
      collection: collectionName,
      data: payload,
      setId: true,
    });
    yield put(createVirtualGroupSuccess(payload));
  } catch (error) {
    yield put(createVirtualGroupError(error));
  }
}

export function* onCreateVirtualGroup() {
  yield takeLatest(
    virtualGroupActionType.CREATE_VIRTUAL_GROUP_START,
    createVirtualGroupGenerator
  );
}

export function* readMyVirtualGroupsGenarator({ payload }) {
  try {
    let virtualGroups = yield readDocumentsWhereContains({
      collection: collectionName,
      arrayName: 'users',
      fieldValue: payload,
    });
    const data = {
      myGroups: virtualGroups,
    };
    yield put(updateVirtualGroupReducer(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onReadMyVirtualGroups() {
  yield takeLatest(
    virtualGroupActionType.READ_MY_VIRTUAL_GROUPS,
    readMyVirtualGroupsGenarator
  );
}

export function* readVirtualGroupsByModuleGenarator({ payload }) {
  try {
    let virtualGroups = yield readDocumentsWhereEqual({
      collection: collectionName,
      fieldName: 'moduleCode',
      fieldValue: payload,
    });
    const data = {
      [payload]: virtualGroups,
    };
    yield put(updateVirtualGroupReducer(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onReadVirtualGroupsByModule() {
  yield takeEvery(
    virtualGroupActionType.READ_VIRTUAL_GROUPS_BY_MODULE,
    readVirtualGroupsByModuleGenarator
  );
}

export function* sendJoinRequestGenerator({ payload }) {
  try {
    yield updateDocumentArrayUnion({
      collection: collectionName,
      docId: payload.id,
      field: 'userRequests',
      data: payload.data,
    });
    // update the virtual group with the new user request
    yield put(sendJoinRequestSuccess(payload));
  } catch (error) {
    yield put(sendJoinRequestError(error));
  }
}

export function* onSendJoinRequest() {
  yield takeEvery(
    virtualGroupActionType.SEND_JOIN_REQUEST_START,
    sendJoinRequestGenerator
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
    // update the virtual group with the new accepted user
    // and updated user requests
    payload.prop = 'users';
    yield put(acceptUserRequestSuccess(payload));
  } catch (error) {
    yield put(acceptUserRequestError(error));
  }
}

export function* onAcceptUserRequest() {
  yield takeEvery(
    virtualGroupActionType.ACCEPT_USER_REQUEST_START,
    acceptUserRequestGenerator
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
    virtualGroupActionType.REMOVE_USER_REQUEST_START,
    removeUserRequestGenerator
  );
}

export function* virtualGroupSaga() {
  yield all([
    call(onCreateVirtualGroup),
    call(onReadMyVirtualGroups),
    call(onReadVirtualGroupsByModule),
    call(onSendJoinRequest),
    call(onRemoveUserRequest),
    call(onAcceptUserRequest),
  ]);
}
