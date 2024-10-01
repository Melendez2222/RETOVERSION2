import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItemDetail } from '../components/BODY/Interfaces';



export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-url.com/' }),
  endpoints: (builder) => ({
    addCartItem: builder.mutation<void, CartItemDetail>({
      query: (cartItemDetail) => ({
        url: 'Cart/CartItems',
        method: 'POST',
        body: cartItemDetail,
      }),
    }),
    decreaseCartItem: builder.mutation<void, CartItemDetail>({
      query: (cartItemDetail) => ({
        url: 'Cart/DecreaseCartItem',
        method: 'POST',
        body: cartItemDetail,
      }),
    }),
  }),
});

export const { useAddCartItemMutation, useDecreaseCartItemMutation } = cartApi;
