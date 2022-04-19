import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import newsReducer from './news/newsSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
