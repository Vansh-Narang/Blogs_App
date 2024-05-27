import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/slice';

const rootReducer = {
    blog: blogReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
