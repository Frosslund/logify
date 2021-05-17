import { createSlice } from "@reduxjs/toolkit";
import { updateFirestoreState } from '../utils/firebaseConfig';

const initialState = {
	logs: []
}


/* 
Structure of a log:
{
    id: Date,
    album: (Album object returned from Spotify API),
    dateAdded: Date,
    firstListen: boolean,
    rating: number,
    review: string
}
*/

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        addLog: (state, action) => {
            let firstListen = true;
            state.logs.forEach(log => {
                if (log.album.id === action.payload.album.id) {
                    firstListen = false;
                };
            });
            action.payload = {...action.payload, firstListen}
            state.logs = [...state.logs, action.payload];
            updateFirestoreState({...state})
        },
		syncUserLog: (state, action) => {
			state.logs = action.payload;
		}
    }
});

export const { addLog, syncUserLog } = logSlice.actions;

export const logSelector = state => state.log

export default logSlice.reducer

export const addToLog = (log) => {
    return dispatch => {
		const time1 = new Date().toISOString().slice(0, 10)
		const time2 = new Date().toISOString().slice(11, 16)
		const toLog = {
			album: log,
            dateAdded: time1 + " " + time2,
			id: Date.now(),
            rating: log.rating,
            review: log.review
		}
		dispatch(addLog(toLog))
    }
}

export const syncLog = (data) => {
	return dispatch => {
		try {
            dispatch(syncUserLog(data.logs));
        } catch (err) {
            console.log(err)
        }
	}
}
