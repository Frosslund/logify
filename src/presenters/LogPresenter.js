import LogView from "../views/LogView"
import { fetchAlbum } from "../slices/albumSlice";
import { fetchArtist } from "../slices/artistSlice";
import { addToWish, handleList } from "../slices/listSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        logs: state.log.logs,
        loading: state.log.loading,
        name: state.user.userName,
        imageURL: state.user.userImageURL,
        lists: state.list.lists
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id)),
        setArtist: id => dispatch(fetchArtist(id)),
        onAddToWish: (res) => {dispatch(addToWish(res));},
        onAddToList: (exists, name, album) => {dispatch(handleList(exists, name, album));}
    };
}


const LogPresenter = connect(mapStateToProps, mapDispatchToProps)(LogView)

export default LogPresenter;
