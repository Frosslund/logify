import AlbumView from "../views/AlbumView"
import { connect } from "react-redux";
import { addToLog } from "../slices/logSlice";
import { addToWish, handleList } from "../slices/listSlice";
import { fetchArtist } from "../slices/artistSlice";


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
        popularity: state.album.popularity,
        externalUrl: state.album.externalUrl,
        lists: state.list.lists
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddToLog: (res) => {dispatch(addToLog(res));},
        onAddToWish: (res) => {dispatch(addToWish(res));},
        onAddToList: (exists, name, album) => {dispatch(handleList(exists, name, album));},
        setArtist: id => dispatch(fetchArtist(id)),
    };
}

const AlbumPresenter = connect(mapStateToProps, mapDispatchToProps)(AlbumView)

export default AlbumPresenter;
