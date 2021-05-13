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
            //review: "The newest pop star just came out with a hot new track! It’s got bumpin’ beats, soulful lyrics, honest messages, and a hook like no other. In this generic pop song review, we give the generic pop song a 10/10 for creativity, imagination, complexity, and catchiness. First, the lyrics. They’re so empowering and personal: Yes, I AM beautiful! Luckily, this generic pop song realizes the powerful message it conveys, and opts to repeat its message no less than 20 times each minute. But the heartfelt message is intertwined with real, personal, autotuned struggles, most likely taken from the darkest depths of the minds of the performers. That personal connection makes this generic pop song so emotionally catchy. Not only do the artists have “big booties”, “a million dollars”, and “a significant other” they can’t have, so do I. And knowing that the connection is there is something that can’t be faked. This excerpt is a personal favorite, reaffirming that everyone on planet Earth, even the biggest pop artists, have the same struggles: “Baby, I never felt love like this/but I got a lot of money so give me a kiss/yeah yeah/And I love you baby, so so much/come closer into my pants and touch/” The heart and soul here is evident, most likely drawing on past experiences of personal hardships and tragedy. All of this honesty is on top of extremely unique and bumping instrumentals. From the unpredictable kick/snare combo on the beat, to the never-before-heard I – V – vi – IV chord progression, it’s no wonder that this generic pop song was nominated for a Grammy before it was ever recorded. It paves a whole new path for the future of music, unlocking doors that no one ever thought existed. Fortunately, it’s not too complex, but rather, just the right amount of complex. No surprise eighth notes, no surprise key changes, no tempo changes. Of course, this generic pop song wouldn’t be possible without the help of the talented producers, songwriters, and financial backers. It’s impossible to think that ONE person could write such powerful lyrics, and in fact, one person didn’t. This generic pop song, with no more than 50 unique words, was written with a team of only 7 writers (plus the performer). It’s amazing not only the talent each writer has, but the fact that each writer has a depth of experience to draw upon. And the team of 10 highly acclaimed producers, who thought outside of the box with their creative backing track and hook. And the financial backers, who helped finance the incredibly powerful music video, which featured three minutes of passionate booty shaking and one minute of a shirtless man, all within a large, colorfully lit room. This is a track everyone should listen to. This generic pop song will pave the way for future musicians everywhere. Little girls around the world will know there’s a powerful, generic pop artist they can relate to, and little boys around the world will learn the true definition of being a man. This track, by no means, is degrading, bland, over-used, repetitive, or an extremely stupid waste of time and money. No. This is a Grammy award-winning track written from the heart with no ulterior motives. And if anyone disagrees, just remember, “I’m right, you’re wrong, sexy sexy thong."
            review: ""
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
