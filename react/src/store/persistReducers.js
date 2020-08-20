import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'intranet',
      storage,
      whitelist: ['auth', 'employee'],
    },
    reducers
  );

  return persistedReducer;
};
