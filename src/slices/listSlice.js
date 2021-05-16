import { createSlice } from "@reduxjs/toolkit";
import { updateFirestoreState } from '../utils/firebaseConfig';
import { post } from '../utils/api';
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    wishlist: [],
	lists: [],
    currentList: {
        albums: [],
        name: ''
    }
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addWish: (state, action) => {
            state.wishlist = [...state.wishlist, action.payload];
            state.lists = [...state.lists]
            state.currentList = {...state.currentList}
            updateFirestoreState({...state});
        },
        addNewList: (state, action) => {
            state.lists = [...state.lists, {name: action.payload.name, albums: [action.payload.album]}]
            state.wishlist = [...state.wishlist]
            state.currentList = {...state.currentList}
            updateFirestoreState({...state});
        },
        addToList: (state, action) => {
            state.lists.forEach((list) => {
                if (list.name === action.payload.name) {
                    list.albums.push(action.payload.album);
                }
            });
            state.lists = [...state.lists]
            state.wishlist = [...state.wishlist]
            state.currentList = {...state.currentList}
            updateFirestoreState({...state});
        },
        setCurrentList: (state, action) => {
            state.currentList = action.payload;
            state.lists = [...state.lists]
            state.wishlist = [...state.wishlist]
            updateFirestoreState({...state});
        },
        removeFromCurrentList: (state, action) => {
            state.currentList.albums.filter(album => album !== action.payload);
            /* Change in lists as well. */
            state.lists = [...state.lists]
            state.wishlist = [...state.wishlist]
            state.currentList = {...state.currentList}
            updateFirestoreState({...state});
        },
		syncUserWish: (state, action) => {
			state.wishlist = action.payload;
		},
        syncUserLists: (state, action) => {
			state.lists = action.payload;
		},
        syncCurrentList: (state, action) => {
            state.currentList = action.payload;
        }
    }
});

export const { addWish, addNewList, addToList, syncUserWish, syncUserLists, syncCurrentList, setCurrentList, removeFromCurrentList } = listSlice.actions;

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

export const handleList = (exists, name, album) => {
    return dispatch => {
        if (!exists) {
            dispatch(addNewList({name: name, album: album}));
        } else {
            dispatch(addToList({name: name, album: album}));
        }
    }
}

export const syncLists = (data) => {
	return dispatch => {
		try {
            dispatch(syncUserWish(data.wishlist));
            dispatch(syncUserLists(data.lists));
            dispatch(syncCurrentList(data.currentList));
        } catch (err) {
            console.log(err)
        }
	}
}

export const createPlaylist = (user, list) => {
    return async (dispatch) => {
        try {
            const API_URL = REACT_APP_BASE_URL + `/users/${user}/playlists`
            const req_body = {
                "name": "Logify-test",
                "description": "Playlist created from your list at Logify!"
            }
            const data = await post(API_URL, req_body)
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
}
