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
        syncName: (state, action) => {
            state.userData.name = action.payload.name 
        },
        syncLists: (state, action) => {
            state.userData.lists = action.payload.lists
        },
        syncWishlist: (state, action) => {
            state.userData.wishlist = action.payload.wishlist
        },
        syncLogs: (state, action) => {
            state.userData.logs = action.payload.logs
        }
    }
});

export const { syncName, syncLists, syncWishlist, syncLogs } = userDataSlice.actions;

export const userDataSelector = state => state.userData

export default userDataSlice.reducer

export const syncUser = (data) => {
    return dispatch => {
        try {
            dispatch(syncName(data.name));
            dispatch(syncLists(data.lists));
            dispatch(syncWishlist(data.wishlist));
            dispatch(syncLogs(data.logs));
        } catch (err) {
            console.log(err)
        }
    }
}
