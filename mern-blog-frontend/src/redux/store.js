import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts'
import { authReducer } from './slices/posts'

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: Reducer,
    },
});

export default store;