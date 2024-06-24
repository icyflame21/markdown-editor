import { createSlice } from '@reduxjs/toolkit';

const markdownSlice = createSlice({
  name: 'markdown',
  initialState: {
    markdown: '',
    viewMode: 'preview'
  },
  reducers: {
    setMarkdown: (state, action) => {
      state.markdown = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setMarkdown, setViewMode } = markdownSlice.actions;

export default markdownSlice.reducer;
