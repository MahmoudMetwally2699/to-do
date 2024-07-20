import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './createSlice'; // Adjust the path if necessary

const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;
