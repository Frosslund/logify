import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';

import userReducer from './slices/userSlice';
import logReducer from './slices/logSlice';
import searchReducer from './slices/searchSlice';
import albumReducer from './slices/albumSlice';
import listReducer from './slices/listSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        log: logReducer,
        search: searchReducer,
        album: albumReducer,
        list: listReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
});

export default store;

