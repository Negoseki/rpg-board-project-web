import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BoardStateType } from '../../models/types/store/board-state.type';
import { FigureState } from '../../models/types/store/figure-state.type';
import { PositionState } from '../../models/types/store/position-state.type';

const initialState: BoardStateType = {
  id: '6504a410cd3345a537f2de71',
  tileSize: 48,
  board: Array(50).fill(Array(50).fill(0)),
  figures: {},
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    loadBoard(state, action: PayloadAction<{ figures: FigureState[] }>) {
      state.figures = action.payload.figures.reduce(
        (obj, cur) => ({ ...obj, [cur.id]: cur }),
        {}
      );
    },
    loadBoardFigures(state, action: PayloadAction<FigureState[]>) {
      state.figures = action.payload.reduce(
        (obj, cur) => ({ ...obj, [cur.id]: cur }),
        {}
      );
    },
    figureNewPosition(
      state,
      action: PayloadAction<{ figure: FigureState; position: PositionState }>
    ) {
      state.figures[action.payload.figure.id].position =
        action.payload.position;
    },
    updateFigure(state, action: PayloadAction<FigureState>) {
      state.figures[action.payload.id] = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;
export const boardReducer = boardSlice.reducer;
