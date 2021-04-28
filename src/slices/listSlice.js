import { createSlice } from "@reduxjs/toolkit";
import { updateFirestoreState } from '../utils/firebaseConfig';

const initialState = {
    wishlist: [],
	lists: []
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addWish: (state, action) => {
            state.wishlist = [...state.wishlist, action.payload];
            state.lists = [...state.lists]
            updateFirestoreState({...state});
        },
        addList: (state, action) => {
            state.lists = [...state.lists, action.payload];
            updateFirestoreState({...state});
        },
		syncUserWish: (state, action) => {
			state.wishlist = action.payload;
		}
    }
});

export const { addWish, syncUserWish } = listSlice.actions;

export const listSelector = state => state.list

export default listSlice.reducer

export const addToWish = (album) => {
    return dispatch => {
        console.log(album)
		const newWish = {
			album: album,
            dateAdded: new Date().toISOString().slice(0, 10),
			id: Date.now(),
		}
		dispatch(addWish(newWish))
    }
}

export const syncLists = (data) => {
	return dispatch => {
		try {
            dispatch(syncUserWish(data.wishlist));
        } catch (err) {
            console.log(err)
        }
	}
}
