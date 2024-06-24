import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import markdownSlice from './features/markdownSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        markdown: markdownSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
