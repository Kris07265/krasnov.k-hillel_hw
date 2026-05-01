import { baseApi } from './baseApi';

export const reviewsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: (limit) => `comments?limit=${limit}`,
            providesTags: ['Review'],
        }),
    }),
    overrideExisting: false,
});

export const { useGetReviewsQuery } = reviewsApi;