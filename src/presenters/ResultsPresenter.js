import { fetchAlbum } from "../slices/albumSlice";
import { getNewReleases } from "../slices/searchSlice";
import ResultsView from "../views/ResultsView"
import { connect } from "react-redux";
import { addToLog } from "../slices/logSlice";

const mapStateToProps = (state) => {
    return {
        albums: state.search.albums,
        artists: state.search.artists,
        topResult: state.search.topResult,
        newReleases: state.search.newReleases,
        user: state.user.userName
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id)),
        getNewReleases: () => dispatch(getNewReleases()),
        onAddToLog: (res) => {dispatch(addToLog(res));}
    };
}

const ResultsPresenter = connect(mapStateToProps, mapDispatchToProps)(ResultsView)

export default ResultsPresenter;
    