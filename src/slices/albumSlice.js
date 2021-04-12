import { createSlice } from "@reduxjs/toolkit";
import { get } from '../utils/api';

const { REACT_APP_BASE_URL } = process.env;

const initialState = {
    name: undefined,
    artists: [],
    tracks: [],
    totalTracks: undefined,
    images: [],
    released: undefined,
    runningTime: undefined,
    popularity: undefined
}

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setArtists: (state, action) => {
            state.artists = action.payload;
        },
        setTracks: (state, action) => {
            state.tracks = action.payload;
        },
        setTotTracks: (state, action) => {
            state.totalTracks = action.payload;
        },
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setReleased: (state, action) => {
            state.released = action.payload;
        },
        setRunningTime: (state, action) => {
            state.runningTime = action.payload;
        },
        setPopularity: (state, action) => {
            state.popularity = action.payload;
        }
    }
});

export const { 
    setName, 
    setArtists, 
    setTracks, 
    setTotTracks, 
    setImages, 
    setReleased, 
    setRunningTime,
    setPopularity
} = albumSlice.actions;

export const albumSelector = state => state.album 

export default albumSlice.reducer

export const fetchAlbum = (id) => {

    const fixArtists = (data) => {
        const artists = [];
        data.forEach(artist => {artists.push(artist.name)});
        return artists;
    };

    const fixTracks = (data) => {
        const tracks = [];
        let totTime = 0;
        data.forEach(item => {
            tracks.push({
                name: item.name,  
                track_number: item.track_number, 
                duration_ms: item.duration_ms
            });
            totTime = totTime + item.duration_ms;
        });
        return [tracks, totTime];
    };

    return async dispatch => {
        try {
            const album = await get(`${REACT_APP_BASE_URL}/albums/${id}`);
            const artists = fixArtists(album.artists) 
            const trackFix = fixTracks(album.tracks.items) 
            dispatch(setName(album.name))           
            dispatch(setArtists(artists))
            dispatch(setTracks(trackFix[0]))
            dispatch(setRunningTime(trackFix[1]))
            dispatch(setTotTracks(album.total_tracks))
            dispatch(setImages(album.images))
            dispatch(setReleased(album.release_date.split("-", 1).pop()))
            dispatch(setPopularity(album.popularity))
        } catch (err) {
            console.log(err)
        }
    }
}