import { AnyAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppState } from '../../models/types/store/app-state.type';
import { boardReducer } from './board';
import { dragDropReducer } from './drag-drop';

const store = configureStore<AppState>({
  reducer: { board: boardReducer, dragDrop: dragDropReducer },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunkAction = ThunkAction<void, AppState, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
