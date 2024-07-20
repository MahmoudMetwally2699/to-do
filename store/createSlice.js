import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    list: [],
    selectedBlog: null,
    blogToEdit: null,
  },
  reducers: {
    addBlog: (state, action) => {
      state.list.push({ title: action.payload.title, content: action.payload.content });
    },
    deleteBlog: (state, action) => {
      state.list = state.list.filter((_, index) => index !== action.payload);
    },
    selectBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    setBlogToEdit: (state, action) => {
      state.blogToEdit = action.payload;
    },
    updateBlog: (state, action) => {
      const { index, title, content } = action.payload;
      state.list[index] = { title, content };
      if (state.selectedBlog && state.selectedBlog.title === state.list[index].title) {
        state.selectedBlog = { ...state.list[index] };
      }
    },
    clearBlogToEdit: (state) => {
      state.blogToEdit = null;
    },
  },
});

export const { addBlog, deleteBlog, selectBlog, setBlogToEdit, updateBlog, clearBlogToEdit } = blogSlice.actions;

export default blogSlice.reducer;
