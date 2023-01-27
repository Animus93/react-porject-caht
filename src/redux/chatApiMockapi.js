import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const chatApiMockapi = createApi({
  reducerPath: 'chat',
  tagTypes: ['chatTag'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63cb9e6a5c6f2e1d84b8d614.mockapi.io',
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/chat',
      providesTags: ['chatTag'],
    }),
    addMessage: builder.mutation({
      query: data => ({
        url: '/chat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['chatTag'],
    }),
    updateMessages: builder.mutation({
      query: () => '/chat',
      invalidatesTags: ['chatTag'],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation, useUpdateMessagesMutation} = chatApiMockapi;
