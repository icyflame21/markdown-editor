import { configureStore } from '@reduxjs/toolkit';
import markdownSlice from './features/markdownSlice';
import { markDownApi } from './features/markDownApi';

const store = configureStore({
    reducer: {
        [markDownApi.reducerPath]: markDownApi.reducer,
        markdown: markdownSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(markDownApi.middleware),
});

export default store;
