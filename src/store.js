import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';

import userReducer from './slices/userSlice';
import logReducer from './slices/logSlice';
import userDataReducer from './slices/userDataSlice';
import searchReducer from './slices/searchSlice';
//import firebase from './utils/firebaseConfig';

const store = configureStore({
    reducer: {
        user: userReducer,
        userData: userDataReducer,
        log: logReducer,
        search: searchReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
});

export default store;

