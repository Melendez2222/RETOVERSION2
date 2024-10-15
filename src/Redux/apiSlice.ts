// src/app/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../components/BODY/Interfaces';
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
    loginusers:builder.query<>
  }),
});

export const { useListAllProductsQuery } = api;
