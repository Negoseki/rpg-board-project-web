import { clearExtraProps } from '@/utils/helpers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardStateType, CurrentBoardState, FigureState } from './board.types';

const initialState: BoardStateType = {
  tileSize: 48,
  board: Array(50).fill([...Array(100).fill(0)]),
  currentBoard: null,
  tempFigure: null,
};

type NewFigureState = Omit<FigureState, 'id' | 'position'>;

enum ScaleRange {
  MAX = 92,
  MIN = 24,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    loadBoard(state, action: PayloadAction<CurrentBoardState>) {
      state.currentBoard = action.payload;
    },
    newFigure(state, action: PayloadAction<NewFigureState>) {
      state.tempFigure = clearExtraProps<NewFigureState>(action.payload, 'id', 'position');
    },
    zoomBoard(state, action: PayloadAction<{ size: number }>) {
      const range = ScaleRange.MAX - ScaleRange.MIN;
      const sizeFactor = ((state.tileSize - ScaleRange.MIN) * 4) / range + 1;

      if (state.tileSize >= ScaleRange.MIN && state.tileSize <= ScaleRange.MAX) {
        state.tileSize += Math.round(sizeFactor * action.payload.size);
      }
      if (state.tileSize < ScaleRange.MIN) {
        state.tileSize = ScaleRange.MIN;
      }
      if (state.tileSize > ScaleRange.MAX) {
        state.tileSize = ScaleRange.MAX;
      }
    },
  },
});

export const boardActions = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
