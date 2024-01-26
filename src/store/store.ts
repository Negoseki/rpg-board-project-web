import { boardReducer } from '@/features/board';
import { api } from '@/services/api';

import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { uiReducer } from './ui';
import { authReducer } from './user';

const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
export type AppThunkAction = ThunkAction<void, AppState, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
