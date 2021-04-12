import AlbumView from "../views/AlbumView"
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        name: state.album.name,
        artists: state.album.artists,
        tracks: state.album.tracks,
        totalTracks: state.album.totalTracks,
        images: state.album.images,
        released: state.album.released,
        runningTime: state.album.runningTime,
        popularity: state.album.popularity
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSearch: undefined
    };
}

const AlbumPresenter = connect(mapStateToProps, mapDispatchToProps)(AlbumView)

export default AlbumPresenter;
