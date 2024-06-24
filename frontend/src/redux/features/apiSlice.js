import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURL = process.env.REACT_APP_BACKEND_URL;

export const apiSlice = createApi({
  reducerPath: 'markDownApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    convertMarkdown: builder.query({
      query: (markdown) => `/convert?markdown=${encodeURIComponent(markdown)}`,
    }),
    convertToRaw: builder.query({
      query: (markdown) => `/raw?markdown=${encodeURIComponent(markdown)}`,
    }),
  }),
});

export const { useConvertMarkdownQuery, useConvertToRawQuery } = apiSlice;
