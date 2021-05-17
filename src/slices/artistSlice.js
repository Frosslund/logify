import { createSlice } from "@reduxjs/toolkit";
import { get } from '../utils/api';
const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    artist: {
        name: '',
        popularity: 0,
        image: [{
            url: ''
        }],
        albums: [{
            name: '',
            artists: [{
                name: ''
            }],
            release_date: '',
            popularity: 0,
            images: [{}, {
                url: ''
            }]
        }],
        genres: []
    },
    relatedArtists: [{
        images: [{
                url: ''
            }]
    }],
    loading: false
}

const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
        setArtist: (state, action) => {
            state.artist.name = action.payload.name
            state.artist.popularity = action.payload.popularity
            state.artist.image = action.payload.images[0]
            state.artist.genres = action.payload.genres
        },
        setAlbums: (state, action) => {
            state.artist.albums = action.payload
        },
        setRelated: (state, action) => {
            state.relatedArtists = action.payload
        },
        setLoadingState: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setArtist, setAlbums, setRelated, setLoadingState } = artistSlice.actions;

export const artistSelector = state => state.artist

export default artistSlice.reducer

export const fetchArtist = (id) => {

    const noDuplicates = (list) => {
        let names = []
        let newList = []
        for (let i=0; i<list.length; i++) {
            if (names.includes(list[i].name, 0)) {
                continue
            }
            else {
                newList.push(list[i])
                names.push(list[i].name)
            }
        }
        return newList
    }

    return async (dispatch) => {
        try {
            dispatch(setLoadingState(true));
            const API_URL_ARTIST = REACT_APP_BASE_URL + `/artists/${id}`
            const API_URL_RELATED_ARTISTS = REACT_APP_BASE_URL + `/artists/${id}/related-artists`
            const API_URL_ARTIST_ALBUMS1 = REACT_APP_BASE_URL + `/artists/${id}/albums?limit=50&include_groups=album`
            const API_URL_ARTIST_ALBUMS2 = REACT_APP_BASE_URL + `/artists/${id}/albums?limit=50&offset=50&include_groups=album`
            const artistData = await get(API_URL_ARTIST)
            const relatedArtistData = await get(API_URL_RELATED_ARTISTS)
            const albumData_1 = await get(API_URL_ARTIST_ALBUMS1)
            const albumData_2 = await get(API_URL_ARTIST_ALBUMS2)

            const allAlbums_ = [
                ...albumData_1.items,
                ...albumData_2.items
            ]   
            const ids = allAlbums_.map(album => album.id)
            let allAlbums = []
            while (ids.length > 0) {
                const currentIDs = ids.splice(0, 20)
                const API_URL_ALBUMS = REACT_APP_BASE_URL + `/albums?ids=${currentIDs.toString()}`
                const albumData = await get(API_URL_ALBUMS)
                allAlbums.push(...albumData.albums)
            }
            const sortedRelatedPop = relatedArtistData.artists.sort((a, b) => (a.popularity < b.popularity) ? 1 : -1)
            const sortedAlbumsDate = allAlbums.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1)
            const noDups = noDuplicates(sortedAlbumsDate) 
            dispatch(setArtist(artistData))
            dispatch(setAlbums(noDups))
            dispatch(setRelated(sortedRelatedPop.slice(0, 5)))
            dispatch(setLoadingState(false));
        } catch (err) {
            console.log(err)
        }
    }
}