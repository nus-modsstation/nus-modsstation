import { all, call } from 'redux-saga/effects';

import { userSaga } from './user/user.saga';

export default function* rootSaga() {
  yield all([call(userSaga)]);
}
