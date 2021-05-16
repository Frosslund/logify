import LogView from "../views/LogView"
import { fetchAlbum } from "../slices/albumSlice";
import { fetchArtist } from "../slices/artistSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        logs: state.log.logs,
        name: state.user.userName,
        imageURL: state.user.userImageURL
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id)),
        setArtist: id => dispatch(fetchArtist(id)),
    };
}

const LogPresenter = connect(mapStateToProps, mapDispatchToProps)(LogView)

export default LogPresenter;
