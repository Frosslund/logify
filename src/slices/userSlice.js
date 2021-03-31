import { createSlice } from "@reduxjs/toolkit";
import { get } from '../utils/api';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    loggedIn: false,
    userName: '',
    userId: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        }
    }
});

export const { setLoggedIn, setUserName, setUserId } = userSlice.actions;

export const userSelector = state => state.user 

export default userSlice.reducer

export const fetchUser = () => {
    return async dispatch => {
        try {
            const data = await get(REACT_APP_BASE_URL + '/me')
            console.log(data)
            dispatch(setUserName(data.display_name ? data.display_name : data.id))
            dispatch(setUserId(data.id))
            dispatch(setLoggedIn(true))
        } catch (err) {
            console.log(err)
        }
    }
}