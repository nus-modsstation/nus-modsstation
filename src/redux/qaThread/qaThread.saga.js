import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';

import { qaThreadActionType } from './qaThread.type';
import {
  createQAThreadSuccess,
  createQAThreadError,
  updateQAThreadReducer,
} from './qaThread.action';
import { addDocument, readDocumentsWhereEqual } from '../../services/firestore';

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
    let qaThreads = yield readDocumentsWhereEqual({
      collection: collectionName,
      fieldName: 'ownerId',
      fieldValue: payload,
    });
    const data = {
      myThreads: qaThreads,
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

export function* qaThreadSaga() {
  yield all([
    call(onCreateQAThread),
    call(onReadMyQAThreads),
    call(onReadQAThreadsByModule),
  ]);
}
