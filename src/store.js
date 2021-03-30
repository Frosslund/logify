import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import searchReducer from "./reducers/searchReducer";

const rootReducer = combineReducers({
    search: searchReducer
});

