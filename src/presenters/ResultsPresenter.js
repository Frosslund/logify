import { fetchAlbum } from "../slices/albumSlice";
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
        setAlbum: id => dispatch(fetchAlbum(id)),
    };
}

const ResultsPresenter = connect(mapStateToProps, mapDispatchToProps)(ResultsView)

export default ResultsPresenter;
    