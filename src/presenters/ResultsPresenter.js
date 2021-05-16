import { fetchAlbum } from "../slices/albumSlice";
import { fetchArtist } from "../slices/artistSlice";
import ResultsView from "../views/ResultsView"
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        albums: state.search.albums,
        artists: state.search.artists,
        topResult: state.search.topResult,
        user: state.user.userName
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id, true)),
        setArtist: id => dispatch(fetchArtist(id))
    };
}

const ResultsPresenter = connect(mapStateToProps, mapDispatchToProps)(ResultsView)

export default ResultsPresenter;
    