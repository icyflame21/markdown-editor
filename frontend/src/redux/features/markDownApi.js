import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURL = process.env.REACT_APP_BACKEND_URL;

export const markDownApi = createApi({
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
  }),
});

export const { useConvertMarkdownQuery } = markDownApi;
