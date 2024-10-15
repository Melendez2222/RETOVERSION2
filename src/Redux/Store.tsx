import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import cartReducer from './cartSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './apiSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
    [api.reducerPath]: api.reducer, // Añade el reducer de RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Añade el middleware de RTK Query
});

setupListeners(store.dispatch); // Configura los listeners para el refetch automático

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
