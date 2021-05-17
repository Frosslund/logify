import { configureStore } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';

import userReducer from './slices/userSlice';
import logReducer from './slices/logSlice';
import searchReducer from './slices/searchSlice';
import albumReducer from './slices/albumSlice';
import listReducer from './slices/listSlice';
import artistReducer from './slices/artistSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        log: logReducer,
        search: searchReducer,
        album: albumReducer,
        list: listReducer,
        artist: artistReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch]
});

export default store;

