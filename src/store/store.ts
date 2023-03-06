import filterReducer from './filterReducer';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    filterReducer: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
