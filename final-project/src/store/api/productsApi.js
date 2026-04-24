import { baseApi } from './baseApi';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: 'products',
                params,
            }),
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;