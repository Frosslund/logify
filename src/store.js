import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';

import userReducer from './slices/userSlice';
import logReducer from './slices/logSlice';
import userDataReducer from './slices/userDataSlice';
//import firebase from './utils/firebaseConfig';

const store = configureStore({
    reducer: {
        user: userReducer,
        userData: userDataReducer,
        log: logReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch],
});

export default store;

