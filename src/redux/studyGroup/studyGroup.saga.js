import { takeLatest, takeEvery, put, all, call } from 'redux-saga/effects';
import moment from 'moment';

import { studyGroupActionType } from './studyGroup.type';
import {
  createGroupSuccess,
  createGroupError,
  updateStudyGroup,
} from './studyGroup.action';
import {
  addDocument,
  readDocumentsWhereContains,
  readDocumentsWhereEqual,
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
    yield put(updateStudyGroup(data));
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
    yield put(updateStudyGroup(data));
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

export function* studyGroupSaga() {
  yield all([
    call(onCreateGroup),
    call(onReadMyGroups),
    call(onReadGroupsByModule),
  ]);
}
