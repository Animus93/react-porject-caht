import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userHerokuappApi } from './userHerokuappApi';
import { usersApiMockapi } from './usersApiMockapi';
import userOperations from './middleware/userOperations';
import userSlice from './userSlice';
import { chatApiMockapi } from './chatApiMockapi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userSlice,
  [userHerokuappApi.reducerPath]: userHerokuappApi.reducer,
  [usersApiMockapi.reducerPath]: usersApiMockapi.reducer,
  [chatApiMockapi.reducerPath]: chatApiMockapi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userOperations, userHerokuappApi.middleware, usersApiMockapi.middleware, chatApiMockapi.middleware),
});

export let presistor = persistStore(store);

export default store;
