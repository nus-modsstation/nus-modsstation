import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['authError'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
