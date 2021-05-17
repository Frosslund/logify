import { fetchAlbum } from "../slices/albumSlice";
import { fetchArtist } from "../slices/artistSlice";
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
        loading: state.search.loading,
        user: state.user.userName
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id, true)),
        setArtist: id => dispatch(fetchArtist(id)),
        getNewReleases: () => dispatch(getNewReleases()),
        onAddToLog: (res) => {dispatch(addToLog(res));}
    };
}

const ResultsPresenter = connect(mapStateToProps, mapDispatchToProps)(ResultsView)

export default ResultsPresenter;
    