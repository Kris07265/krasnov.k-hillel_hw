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

        getProductsByCategory: builder.query({
            query: ({ params, category }) => ({
                url: `products/category/${category}`,
                params,
            }),
            providesTags: ['Product'],
        }),

        getCategories: builder.query({
            query: () => 'products/category-list',
        }),

        searchProducts: builder.query({
            query: ({ q, params }) => ({
                url: 'products/search',
                params: { q, ...params },
            }),
            providesTags: ['Product'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useSearchProductsQuery
} = productsApi;