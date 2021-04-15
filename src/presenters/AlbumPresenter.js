import AlbumView from "../views/AlbumView"
import { connect } from "react-redux";
import { addToLog } from "../slices/logSlice";

const mapStateToProps = (state) => {
    return {
        id: state.album.id,
        name: state.album.name,
        artists: state.album.artists,
        tracks: state.album.tracks,
        totalTracks: state.album.totalTracks,
        images: state.album.images,
        released: state.album.released,
        runningTime_ms: state.album.runningTime_ms,
        popularity: state.album.popularity
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToLog: (res) => {dispatch(addToLog(res));}
        //onAddToLog: (res) => dispatch(addToLog({...res, id: Date.now(), dateAdded: Date.toString()}))
    };
}

const AlbumPresenter = connect(mapStateToProps, mapDispatchToProps)(AlbumView)

export default AlbumPresenter;
