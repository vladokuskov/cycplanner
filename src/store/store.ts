import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterReducer';
import profileReducer from './profileReducer';

export const store = configureStore({
  reducer: {
    filterReducer: filterReducer,
    profileReducer: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
