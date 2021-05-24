import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    userName: '',
    userId: '',
    userImageURL: 'https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png'
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
        },
        setUserImageURL: (state, action) => {
            state.userImageURL = action.payload
        }
    }
});

export const { setLoggedIn, setUserName, setUserId, setUserImageURL } = userSlice.actions;

export const userSelector = state => state.user 

export default userSlice.reducer

export const fetchUser = (user) => {
    return dispatch => {
        try {
            dispatch(setUserName(user.display_name ? user.display_name : user.id))
            dispatch(setUserId(user.id))
            if (user.images.length !== 0) {
                dispatch(setUserImageURL(user.images[0].url))
            }
            dispatch(setLoggedIn(true))
        } catch (err) {
            console.log(err)
        }
    }
}