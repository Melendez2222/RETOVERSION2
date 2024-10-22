// src/app/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartDetailDto, Client, Detalle_Factura, FacturaI, Loginuser, Product, ProductUpdate, CartItemDetail } from '../components/BODY/Interfaces';
import { getToken } from '../utils/localStorage';

const API_URL = 'https://localhost:7209/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    validateToken: builder.query<boolean, void>({
      query: () => 'validate-token',
    }),
    loginUser: builder.mutation<any, { loginuser: Loginuser, login: (token: string, userUsername: string, userPassword: string, expiration: string, cartDetails: CartDetailDto[]) => void }>({
        query: ({ loginuser }) => ({
          url: 'api/Auth/login',
          method: 'POST',
          body: loginuser,
        }),
        transformResponse: (response: any, meta, arg) => {
          const { token, userId, expiration, role, cartDetails } = response;
          const { loginuser } = arg;
          arg.login(token, expiration, loginuser.userUsername, loginuser.userPassword, cartDetails);
          return { userId, expiration, role, cartDetails };
        },
      }),
      
    listAllProducts: builder.query<Product[], void>({
      query: () => 'api/Product/list',
    }),
    listCategory: builder.query<any, void>({
      query: () => 'api/Category/list',
    }),
    listClient: builder.query<Client[], void>({
      query: () => 'USER/ListAll',
    }),
    lastFactureId: builder.query<any, void>({
      query: () => 'INVOICE/LastFactura',
    }),
    updateClient: builder.mutation<any, Client>({
      query: (clientdata) => ({
        url: 'USER/Update',
        method: 'PUT',
        body: clientdata,
      }),
    }),
    createClient: builder.mutation<any, Omit<Client, 'iD_CLIENTE' | 'fecha_Creacion' | 'qty' | 'activo'>>({
      query: (clientdata) => ({
        url: 'CLIENT/Create',
        method: 'POST',
        body: clientdata,
      }),
    }),
    updateProduct: builder.mutation<any, ProductUpdate>({
      query: (producttdata) => ({
        url: 'PRODUCT/Update',
        method: 'PUT',
        body: producttdata,
      }),
    }),
    createProduct: builder.mutation<any, Omit<Product, 'iD_PRODUCTO' | 'fecha_Creacion' | 'qty' | 'activo'>>({
      query: (producttdata) => ({
        url: 'PRODUCT/Create',
        method: 'POST',
        body: producttdata,
      }),
    }),
    createFactura: builder.mutation<any, FacturaI>({
      query: (factura) => ({
        url: 'RECEIPT/CreateFactura',
        method: 'POST',
        body: factura,
      }),
    }),
    createDetalleFactura: builder.mutation<any, Detalle_Factura>({
      query: (detallefactura) => ({
        url: 'INVOICE_DETAIL/CreateDetalleFactura',
        method: 'POST',
        body: detallefactura,
      }),
    }),
    addCartItem: builder.mutation<any, CartItemDetail>({
      query: (cartItemDetail) => ({
        url: 'api/CartUser/add-to-cart',
        method: 'POST',
        body: cartItemDetail,
      }),
    }),
    decreaseCartItem: builder.mutation<any, CartItemDetail>({
      query: (cartItemDetail) => ({
        url: 'api/CartUser/decrement-product',
        method: 'POST',
        body: cartItemDetail,
      }),
    }),
    deleteCartItem: builder.mutation<any, CartItemDetail>({
      query: (cartItemDetail) => ({
        url: 'api/CartUser/delete-product',
        method: 'DELETE',
        body: cartItemDetail,
      }),
    }),
    getCartItem: builder.query<any, void>({
      query: () => ({
        url: 'api/CartUser/get-cartdetail',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useValidateTokenQuery,
  useLoginUserMutation,
  useListAllProductsQuery,
  useListCategoryQuery,
  useListClientQuery,
  useLastFactureIdQuery,
  useUpdateClientMutation,
  useCreateClientMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useCreateFacturaMutation,
  useCreateDetalleFacturaMutation,
  useAddCartItemMutation,
  useDecreaseCartItemMutation,
  useDeleteCartItemMutation,
  useGetCartItemQuery,
} = api;
