import { createSlice } from "@reduxjs/toolkit";
import { get } from '../utils/api';
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    topResult: {},
    albums: [],
    artists: [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setAlbumResults: (state, action) => {
            state.albums = action.payload
        },
        setArtistsResults: (state, action) => {
            state.artists = action.payload
        },
        setTopResult: (state, action) => {
            state.topResult = action.payload
        }
    }
});

export const { setAlbumResults, setArtistsResults, setTopResult } = searchSlice.actions;

export const searchSelector = state => state.search

export default searchSlice.reducer

export const initiateSearch = (searchTerm) => {
    return async (dispatch) => {
        try {
            const API_URL = REACT_APP_BASE_URL + `/search?query=${encodeURIComponent(searchTerm)}&type=album,artist&limit=50`
            const searchData = await get(API_URL)
            const artistData = searchData.artists.items.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1).slice(0, 20)
            const albumsData = searchData.albums.items.filter(item => item.album_type != "single")
            let albumIds = albumsData.map(album => album.id)
            albumIds.length > 20 ? albumIds = albumIds.slice(0, 20) : albumIds = albumIds
            const data = await get(REACT_APP_BASE_URL + `/albums?ids=${albumIds.toString()}`)
            const sortedAlbums = data.albums.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
            dispatch(setTopResult(sortedAlbums[0].popularity > artistData[0].popularity ? sortedAlbums[0] : artistData[0]))
            dispatch(setAlbumResults(sortedAlbums))
            dispatch(setArtistsResults(artistData))
        } catch (err) {
            console.log(err)
        }
    }
}

export const clearSearch = () => {
    return dispatch => {
        dispatch(setAlbumResults([]))
        dispatch(setArtistsResults([]))
        dispatch(setTopResult({}))
    }
}

