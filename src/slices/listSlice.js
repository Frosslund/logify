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
    },
    loading: false
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
            if (state.currentList.name === "Listen Later") {
                state.wishlist = state.wishlist.filter(album => album.id !== action.payload.id);
            } else {
            state.lists.forEach(list => {
                if (list.name === state.currentList.name) {
                    list.albums = list.albums.filter(album => album.id !== action.payload.id);
                    if (list.albums.length === 0) {
                        state.lists = state.lists.filter(oneList => oneList.name !== list.name)
                    }
                }
            })};
            state.currentList.albums = state.currentList.albums.filter(album => album.id !== action.payload.id);
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
        },
        setListLoadingState: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { addWish, addNewList, addToList, syncUserWish, syncUserLists, syncCurrentList, setCurrentList, removeFromCurrentList, setListLoadingState } = listSlice.actions;

export const listSelector = state => state.list

export default listSlice.reducer

export const addToWish = (album) => {
    return dispatch => {
		dispatch(addWish(album))
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
            console.log(list)
            let listOfTracks = []
            list.albums.forEach(album => {
                album.tracks.forEach(track => {
                    listOfTracks.push(`spotify:track:${track.id}`)
                })
            })
            let API_URL = REACT_APP_BASE_URL + `/users/${user}/playlists`
            let req_body = {
                "name": `Logify-${list.name}`,
                "description": `Playlist created from your list "${list.name}" at Logify!`
            }
            const data = await post(API_URL, req_body)
            API_URL = REACT_APP_BASE_URL + `/playlists/${data.id}/tracks`
            req_body = {"uris": listOfTracks}
            const addedData = await post(API_URL, req_body)
            console.log(addedData)
        } catch (err) {
            console.log(err)
        }
    }
}
