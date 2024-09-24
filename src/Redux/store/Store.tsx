import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './../tokenSlice';

const Store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
