import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [], // Array to store blogs
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        addBlog: (state, action) => {
            state.blogs.push(action.payload); // Add new blog
        },
        getBlog: (state, action) => {
            return state.blogs.find(blog => blog._id === action.payload);
        },
        updateBlog: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.blogs.findIndex(blog => blog._id === id);
            state.blogs[index] = { ...state.blogs[index], ...updatedData };
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload; // Set initial blogs from backend
        }
    }
});

export const { addBlog, updateBlog, deleteBlog, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
