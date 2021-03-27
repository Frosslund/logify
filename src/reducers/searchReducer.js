import {
    SEARCH_ALBUMS
} from "../actions/types";

const initialState = {
    albums: [],
    artists: [],
    topResult: {},
    currentAlbum: {},
    loading: false
};

const chooseTopResult = (albums) => {
    // iterate through albums and return most popular
} 

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ALBUMS:
            return {
                ...state,
                loading: false,
                albums: action.payload,
                topResult: chooseTopResult(action.payload)
            };
        default:
            return state;
    }
}