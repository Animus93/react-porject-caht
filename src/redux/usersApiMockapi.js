import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const usersApiMockapi = createApi({
  reducerPath: 'users',
  tagTypes: ['usersTag'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63cb9e6a5c6f2e1d84b8d614.mockapi.io',
  }),
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['usersTag'],
    }),
    addUser: builder.mutation({
      query: data => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['usersTag'],
    }),
    userOnline: builder.mutation({
      query: id => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: {isOnline: true}
      }),
      invalidatesTags: ['usersTag'],
    }),
    userOffline: builder.mutation({
      query: id => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: {isOnline: false}
      }),
      invalidatesTags: ['usersTag'],
    }),
    updateUsers: builder.mutation({
      query: () => '/users',
      invalidatesTags: ['usersTag'],
    })
  }),
});

export const {useGetUsersQuery, useAddUserMutation, useUserOnlineMutation, useUserOfflineMutation, useUpdateUsersMutation} = usersApiMockapi;