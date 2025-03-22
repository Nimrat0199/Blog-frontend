import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import blogSlice from './blogSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        blog : blogSlice
        //TODO: add more slices here for posts
    }
});


export default store;