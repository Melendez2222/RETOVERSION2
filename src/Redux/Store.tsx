import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
