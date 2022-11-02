
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import storageSession from 'redux-persist/lib/storage/session';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const reducers = combineReducers( {
  theme: themeSlice,
} );

const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer( rootPersistConfig, reducers );


const store = configureStore( {
  reducer: persistedReducer,
  middleware: ( getDefaultMiddleware ) =>
    getDefaultMiddleware( {
      serializableCheck: {
        ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
      },
    } ),
} );

export default store;