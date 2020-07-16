import { all, call } from 'redux-saga/effects';

import { userSaga } from './user/user.saga';
import { studyGroupSaga } from './studyGroup/studyGroup.saga';
import { virtualGroupSaga } from './virtualGroup/virtualGroup.saga';
import { qaThreadSaga } from './qaThread/qaThread.saga';

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(studyGroupSaga),
    call(virtualGroupSaga),
    call(qaThreadSaga),
  ]);
}
