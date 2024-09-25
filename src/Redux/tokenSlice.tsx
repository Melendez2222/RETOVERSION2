import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: string|null;
}

const initialState: TokenState = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenSR: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setTokenSR, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
