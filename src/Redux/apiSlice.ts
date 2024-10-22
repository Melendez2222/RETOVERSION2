// src/app/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Loginuser, Product } from '../components/BODY/Interfaces';
import { getToken } from '../utils/localStorage';

const API_URL = 'https://localhost:7209/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== 'listAllProducts') {
        const token = getToken();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    listAllProducts: builder.query<Product[], void>({
      query: () => 'Product/list',
    }),
    loginUser: builder.mutation<any, { loginuser: Loginuser, login: (token: string, userUsername: string, userPassword: string, expiration: string, cartDetails: CartDetailDto[]) => void }>({
      query: ({ loginuser }) => ({
        url: 'api/Auth/login',
        method: 'POST',
        body: loginuser,
      }),
      transformResponse: (response: any, meta, arg) => {
        const { token, userId, expiration, role, cartDetails } = response;
        arg.login(token, expiration, loginuser.userUsername, loginuser.userPassword, cartDetails);
        return { userId, expiration, role, cartDetails };
      },
    }),
  }),
});

export const { useListAllProductsQuery } = api;
