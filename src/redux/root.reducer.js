import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/user.reducer';
import { studyGroupReducer } from './studyGroup/studyGroup.reducer';
import { virtualGroupReducer } from './virtualGroup/virtualGroup.reducer';
import { qaThreadReducer } from './qaThread/qaThread.reducer';
import { userActionType } from './user/user.type';

const persistConfig = {
  key: 'root',
  storage,
  //blacklist: ['user'],
  blacklist: ['studyGroup', 'qaThread'],
};

// const userPersistConfig = {
//   key: 'user',
//   storage,
//   blacklist: ['authError'],
// };

const studyGroupPersistConfig = {
  key: 'studyGroup',
  storage,
  blacklist: ['searchResults'],
};

const qaThreadPersistConfig = {
  key: 'qaThread',
  storage,
  blacklist: ['currentThread'],
};

const appReducer = combineReducers({
  //user: persistReducer(userPersistConfig, userReducer),
  user: userReducer,
  studyGroup: persistReducer(studyGroupPersistConfig, studyGroupReducer),
  virtualGroup: virtualGroupReducer,
  // qaThread: qaThreadReducer,
  qaThread: persistReducer(qaThreadPersistConfig, qaThreadReducer),
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  // reset state after user logged out successfully
  if (action.type === userActionType.LOGOUT_SUCCESS) {
    state = initialState;
  }

  return appReducer(state, action);
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
