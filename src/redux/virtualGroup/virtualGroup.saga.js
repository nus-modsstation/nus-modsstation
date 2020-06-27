import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';

import { virtualGroupActionType } from './virtualGroup.type';
import {
  createVirtualGroupSuccess,
  createVirtualGroupError,
  updateVirtualGroup,
  updateVirtualGroupSuccess,
  updateVirtualGroupError,
} from './virtualGroup.action';
import {
  addDocument,
  readDocumentsWhereContains,
  readDocumentsWhereEqual,
  updateDocument,
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
    yield put(updateVirtualGroup(data));
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
    yield put(updateVirtualGroup(data));
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

export function* updateVirtualGroupGenerator({ payload }) {
  try {
    yield updateDocument({
      collection: collectionName,
      docId: payload.id,
      data: payload.data,
    });
    yield put(updateVirtualGroupSuccess(payload.data));
  } catch (error) {
    yield put(updateVirtualGroupError(error));
  }
}

export function* onUpdateVirtualGroup() {
  yield takeLatest(
    virtualGroupActionType.UPDATE_VIRTUAL_GROUP_START,
    updateVirtualGroupGenerator
  );
}

export function* virtualGroupSaga() {
  yield all([
    call(onCreateVirtualGroup),
    call(onReadMyVirtualGroups),
    call(onReadVirtualGroupsByModule),
    call(onUpdateVirtualGroup),
  ]);
}
