import { configureStore } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';

import userReducer from './slices/userSlice';
import logReducer from './slices/logSlice';
import searchReducer from './slices/searchSlice';
//import firebase from './utils/firebaseConfig';
import albumReducer from './slices/albumSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        //userData: userDataReducer,
        log: logReducer,
        search: searchReducer,
        album: albumReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
});

export default store;

