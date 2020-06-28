import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/user.reducer';
import { studyGroupReducer } from './studyGroup/studyGroup.reducer';
import { userActionType } from './user/user.type';

const persistConfig = {
  key: 'root',
  storage,
  //blacklist: ['user'],
  blacklist: ['studyGroup'],
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

const appReducer = combineReducers({
  //user: persistReducer(userPersistConfig, userReducer),
  user: userReducer,
  studyGroup: persistReducer(studyGroupPersistConfig, studyGroupReducer),
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
