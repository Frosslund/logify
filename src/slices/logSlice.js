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
        /* addLog: (state, action) => {
            state.logs[action.payload.id] = action.payload.data;
            updateFirestoreState(state)
        },
        updateLog: (state, action) => {
            state.logs[action.payload.id] = action.payload.data;
            updateFirestoreState(state)
        },
        removeLog: (state, action) => {
            delete state.logs[action.payload]
            updateFirestoreState(state)
        } */
    }
});

export const { addLog, syncUserLog } = logSlice.actions;

export const logSelector = state => state.log

export default logSlice.reducer

export const addToLog = (log) => {
    return dispatch => {
		console.log(log)
		const toLog = {
			album: log,
            dateAdded: new Date().toISOString().slice(0, 10),
			id: Date.now(),
            rating: (Math.random() * 5).toFixed(1),
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
