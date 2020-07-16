import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';

import { qaThreadActionType } from './qaThread.type';
import {
  createQAThreadSuccess,
  createQAThreadError,
  updateQAThreadReducer,
  updateQAThreadPropPush,
  updateQAThreadPropRemove,
} from './qaThread.action';
import {
  addDocument,
  readDocumentsWhereEqual,
  readDocumentsWhereContains,
  updateDocumentArrayUnion,
  updateDocumentArrayRemove,
} from '../../services/firestore';

const collectionName = 'qaThreads';

export function* createQAThreadGenerator({ payload }) {
  try {
    yield addDocument({
      collection: collectionName,
      data: payload,
      setId: true,
    });
    yield put(createQAThreadSuccess(payload));
  } catch (error) {
    yield put(createQAThreadError(error));
  }
}

export function* onCreateQAThread() {
  yield takeLatest(
    qaThreadActionType.CREATE_THREAD_START,
    createQAThreadGenerator
  );
}

export function* readMyQAThreadsGenarator({ payload }) {
  try {
    let myThreads = yield readDocumentsWhereEqual({
      collection: collectionName,
      fieldName: 'ownerId',
      fieldValue: payload,
    });
    const data = {
      myThreads: myThreads,
    };
    yield put(updateQAThreadReducer(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onReadMyQAThreads() {
  yield takeLatest(
    qaThreadActionType.READ_MY_THREADS,
    readMyQAThreadsGenarator
  );
}

export function* readMyStarredThreadsGenerator({ payload }) {
  try {
    let starredThreads = yield readDocumentsWhereContains({
      collection: collectionName,
      arrayName: 'starredUsers',
      fieldValue: payload,
    });
    const data = {
      starredThreads: starredThreads,
    };
    yield put(updateQAThreadReducer(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onReadMyStarredThreads() {
  yield takeLatest(
    qaThreadActionType.READ_STARRED_THREADS,
    readMyStarredThreadsGenerator
  );
}

export function* readQAThreadsByModuleGenarator({ payload }) {
  try {
    let qaThreads = yield readDocumentsWhereEqual({
      collection: collectionName,
      fieldName: 'moduleCode',
      fieldValue: payload,
    });
    const data = {
      [payload]: qaThreads,
    };
    yield put(updateQAThreadReducer(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onReadQAThreadsByModule() {
  yield takeEvery(
    qaThreadActionType.READ_THREADS_BY_MODULE,
    readQAThreadsByModuleGenarator
  );
}

export function* starThreadGenerator({ payload }) {
  try {
    yield updateDocumentArrayUnion({
      collection: collectionName,
      docId: payload.id,
      field: 'starredUsers',
      data: payload.data,
    });
    payload.prop = 'starredUsers';
    yield put(updateQAThreadPropPush(payload));
  } catch (error) {
    console.log(error);
  }
}

export function* onStarQAThread() {
  yield takeEvery(qaThreadActionType.STAR_THREAD_START, starThreadGenerator);
}

export function* removeStarredThreadGenerator({ payload }) {
  try {
    yield updateDocumentArrayRemove({
      collection: collectionName,
      docId: payload.id,
      field: 'starredUsers',
      data: payload.data,
    });
    payload.prop = 'starredUsers';
    yield put(updateQAThreadPropRemove(payload));
  } catch (error) {
    console.log(error);
  }
}

export function* onRemoveStarredThread() {
  yield takeEvery(
    qaThreadActionType.REMOVE_STARRED_THREAD_START,
    removeStarredThreadGenerator
  );
}

export function* qaThreadSaga() {
  yield all([
    call(onCreateQAThread),
    call(onReadMyQAThreads),
    call(onReadMyStarredThreads),
    call(onReadQAThreadsByModule),
    call(onStarQAThread),
    call(onRemoveStarredThread),
  ]);
}
