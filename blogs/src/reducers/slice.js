import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedBlogs: JSON.parse(localStorage.getItem('blogs')) || [],
    currentBlog: null,
    content: '',
    isEdit: false,
    error: ""
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setSavedBlogs(state, action) {
            state.savedBlogs = action.payload;
        },
        setCurrentBlog(state, action) {
            state.currentBlog = action.payload;
        },
        setContent(state, action) {
            state.content = action.payload;
        },
        setIsEdit(state, action) {
            state.isEdit = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addBlog: (state, action) => {
            if (!Array.isArray(state.savedBlogs)) {
                state.savedBlogs = [];
            }
            state.savedBlogs.push(action.payload);
        },
    },
});
export const updateLocalStorage = () => (dispatch, getState) => {
    const { savedBlogs } = getState().blog;
    localStorage.setItem('blogs', JSON.stringify(savedBlogs));
};


export const { setSavedBlogs, setCurrentBlog, setContent, setIsEdit, setBlogs, addBlog, setError } = blogSlice.actions;
export default blogSlice.reducer;
