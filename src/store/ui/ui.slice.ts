import { AlertColor } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AppAlertState = {
  open: boolean;
  message: {
    title: string;
    description?: string;
  };
  type: AlertColor;
};
const initialState: AppAlertState = {
  open: false,
  message: {
    title: '',
  },
  type: 'error',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showError(
      state,
      action: PayloadAction<{
        title: string;
        description?: string;
        type?: Exclude<AlertColor, 'success'>;
      }>,
    ) {
      state.open = true;
      state.type = action.payload.type || 'error';
      state.message = action.payload;
    },
    showSuccess(state, action: PayloadAction<{ title: string; description?: string }>) {
      state.open = true;
      state.type = 'success';
      state.message = action.payload;
    },
    hideAlert(state) {
      state.message = { ...initialState.message };
      state.open = initialState.open;
      state.type = initialState.type;
    },
  },
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
