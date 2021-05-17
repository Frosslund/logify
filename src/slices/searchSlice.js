import { createSlice } from "@reduxjs/toolkit";
import { get } from '../utils/api';
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    topResult: {},
    albums: [],
    artists: [],
    newReleases: [],
    loading: false
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
        },
        setNewReleases: (state, action) => {
            state.newReleases = action.payload;
        },
        setLoadingState: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setAlbumResults, setArtistsResults, setTopResult, setNewReleases, setLoadingState } = searchSlice.actions;

export const searchSelector = state => state.search

export default searchSlice.reducer

export const initiateSearch = (searchTerm) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingState(true))
            const API_URL = REACT_APP_BASE_URL + `/search?query=${encodeURIComponent(searchTerm)}&type=album,artist&limit=50`
            const searchData = await get(API_URL)
            const artistData = searchData.artists.items.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1).slice(0, 20)
            const albumsData = searchData.albums.items.filter(item => item.album_type !== "single")
            let albumIds = albumsData.map(album => album.id)
            if (albumIds.length > 20) {
                albumIds = albumIds.slice(0, 20)
            }
            const data = await get(REACT_APP_BASE_URL + `/albums?ids=${albumIds.toString()}`)
            const sortedAlbums = data.albums.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
            //console.log(artistData[0])
            //console.log(sortedAlbums[0])
            /* dispatch(setTopResult(sortedAlbums[0].popularity > artistData[0].popularity ? sortedAlbums[0] : artistData[0])) */
            dispatch(setTopResult(sortedAlbums[0]))
            dispatch(setAlbumResults(sortedAlbums))
            dispatch(setArtistsResults(artistData))
            dispatch(setLoadingState(false))
        } catch (err) {
            console.log(err)
        }
    }
}

export const getNewReleases = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingState(true))
            const API_URL = REACT_APP_BASE_URL + '/browse/new-releases?limit=50';
            const releaseData = await get(API_URL)
            const albumsData = releaseData.albums.items.filter(item => item.album_type !== "single")
            let albumIds = albumsData.map(album => album.id)
            if (albumIds.length > 20) {
                albumIds = albumIds.slice(0, 20)
            }
            const data = await get(REACT_APP_BASE_URL + `/albums?ids=${albumIds.toString()}`)
            dispatch(setNewReleases(data))
            dispatch(setLoadingState(false))
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


