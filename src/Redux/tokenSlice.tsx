import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  value: string;
}

const initialState: TokenState = {
  value: localStorage.getItem('token') || '',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.value = '';
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
