import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
};
const initialState: AuthState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
