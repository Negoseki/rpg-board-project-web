import {
  Action,
  ActionCreatorWithPayload,
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { DragDropStateType } from '../../models/types/store/drag-drop-state.type';
import { PositionState } from '../../models/types/store/position-state.type';
import { FigureState } from '../../models/types/store/figure-state.type';

const initialState: DragDropStateType = {
  currentPosition: {
    x: 0,
    y: 0,
  },
  isDrag: false,
  selectedFigure: null,
};

const dragDropSlice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    onDragMove(state, action: PayloadAction<PositionState>) {
      state.currentPosition = action.payload;
    },
    onDragStart(state, action: PayloadAction<FigureState>) {
      state.selectedFigure = action.payload;
      state.isDrag = true;
    },
    onDragEnd(state) {
      state.selectedFigure = null;
      state.isDrag = false;
    },
  },
});

export const dragDropActions = dragDropSlice.actions;
export const dragDropReducer = dragDropSlice.reducer;
