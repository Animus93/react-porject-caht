import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userHerokuappApi = createApi({
  reducerPath: 'userHerokuapp',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
  }),
  endpoints: builder => ({
    userSignup: builder.mutation({
      query: data => ({
        url: '/users/signup',
        method: 'POST',
        body: data,
      }),
    }),
    userLoggedIn: builder.mutation({
      query: data => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      })
    })
  }),
});

export const {useUserSignupMutation, useUserLoggedInMutation} = userHerokuappApi