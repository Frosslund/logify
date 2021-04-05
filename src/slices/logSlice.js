import { createSlice } from "@reduxjs/toolkit";
import { updateFirestoreState } from '../utils/firebaseConfig';

const initialState = {
    logs: {}
}

/* 
Structure of a log:
id: {
    album: (Album object returned from Spotify API)
    dateAdded: Date
    firstListen: boolean
    rating: number,
    review: string
}
*/

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        addLog: (state, action) => {
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
        }
    }
});

export const { addLog, updateLog, removeLog } = logSlice.actions;

export const logSelector = state => state.log

export default logSlice.reducer
