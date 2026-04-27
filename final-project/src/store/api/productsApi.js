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

        getCategories: builder.query({
            query: () => 'products/category-list',
        }),

        getHeroProduct: builder.query({
            query: () => 'products/86',
        }),

        getReviews: builder.query({
            query: () => 'comments?limit=10',
        }),
    }),
    overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetCategoriesQuery, useGetHeroProductQuery, useGetReviewsQuery } = productsApi;