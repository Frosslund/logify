import { createSlice } from "@reduxjs/toolkit";
import { updateFirestoreState } from '../utils/firebaseConfig';

const initialState = {
    id: '',
    name: '',
    artists: [],
    tracks: [],
    totalTracks: 0,
    images: [{
        width: 0,
        height: 0,
        url: ''
    }],
    released: '',
    runningTime_ms: 0,
    popularity: 0,
    loading: false
}

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbum: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.artists = action.payload.artists;
            state.tracks = action.payload.tracks;
            state.totalTracks = action.payload.totalTracks;
            state.images = action.payload.images;
            state.released = action.payload.released;
            state.runningTime_ms = action.payload.runningTime_ms;
            state.popularity = action.payload.popularity;
            updateFirestoreState({album: {...state}})
        },
        syncUserAlbum: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.artists = action.payload.artists;
            state.tracks = action.payload.tracks;
            state.totalTracks = action.payload.totalTracks;
            state.images = action.payload.images;
            state.released = action.payload.released;
            state.runningTime_ms = action.payload.runningTime_ms;
            state.popularity = action.payload.popularity;
        },
        setAlbumLoadingState: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {
    setAlbum,
    syncUserAlbum,
    setAlbumLoadingState
} = albumSlice.actions;

export const albumSelector = state => state.album 

export default albumSlice.reducer

export const fetchAlbum = (album, fromSearch=false) => {

    const fixArtists = (data) => {
        const artists = [];
        data.forEach(artist => {artists.push({name: artist.name, id: artist.id})});
        return artists;
    };

    const fixTracks = (data) => {
        const tracks = [];
        let totTime = 0;
        data.forEach(item => {
            tracks.push({
                name: item.name,  
                track_number: item.track_number, 
                duration_ms: item.duration_ms,
                preview_url: item.preview_url,
                id: item.id
            });
            totTime = totTime + item.duration_ms;
        });
        return [tracks, totTime];
    };

    return async dispatch => {
        try {
            dispatch(setAlbumLoadingState(true))
            //const album = await get(`${REACT_APP_BASE_URL}/albums/${id}`);
            let artists = []
            let tracks = []
            let runningTime = 0
            let released = ''
            let totalTracks = 0
            if (fromSearch) {
                artists = fixArtists(album.artists) 
                const trackFix = fixTracks(album.tracks.items)
                tracks = trackFix[0]
                runningTime = trackFix[1]
                released = album.release_date.split("-", 1).pop()
                totalTracks = album.total_tracks
            } else {
                artists = album.artists
                tracks = album.tracks
                runningTime = album.runningTime_ms
                released = album.released
                totalTracks = album.totalTracks
            }
            const fixedAlbum = {
                id: album.id,
                name: album.name,
                artists: artists,
                tracks: tracks,
                totalTracks: totalTracks,
                images: album.images,
                released: released,
                runningTime_ms: runningTime,
                popularity: album.popularity,
            }
            dispatch(setAlbum(fixedAlbum))
            dispatch(setAlbumLoadingState(false))       
        } catch (err) {
            console.log(err)
        }
    }
}

export const syncAlbum = (data) => {
    return dispatch => {
		try {
            dispatch(syncUserAlbum(data.album));
        } catch (err) {
            console.log(err)
        }
	}
}