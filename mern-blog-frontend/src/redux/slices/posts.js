import { createSlice, createAsyncThunk } from '@redux.js/toolkit';
import second from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('tags');
    return data;
});
    export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => 
    axios.delete('/posts/${id}'),
    );


const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducer: {},
    extraReducers: {
        //Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        // Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.post.items = state.post.items.filter(obj => obj_id == action.meta.arg);
        },
    },
});

export const postReducer = postsSlice.reducer;