import { createSlice } from "@reduxjs/toolkit";

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

export const fetchUser = (user) => {
    return dispatch => {
        try {
            dispatch(setUserName(user.display_name ? user.display_name : user.id))
            dispatch(setUserId(user.id))
            dispatch(setLoggedIn(true))
        } catch (err) {
            console.log(err)
        }
    }
}