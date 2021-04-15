import { createSlice } from "@reduxjs/toolkit";
//import { updateFirestoreState } from '../utils/firebaseConfig';

const initialState = {
    name: '',
    lists: [],
    wishlist: [],
    logs: []
}

/* 
Structure of a log:
id: {
    album: (Album object returned from Spotify API)
    dateAdded: Date
    firstListen: boolean
    rating: number,
    review: string
}
*/

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        syncUserData: (state, action) => {
            state.name = action.payload.name;
            state.lists = action.payload.lists;
            state.wishlist = action.payload.wishlist;
            state.log = action.payload.logs;
        }
    }
});

export const { syncUserData } = userDataSlice.actions;

export const userDataSelector = state => state.userData

export default userDataSlice.reducer

export const syncUser = (data) => {
    return dispatch => {
        try {
            dispatch(syncUserData(data));
        } catch (err) {
            console.log(err)
        }
    }
}
