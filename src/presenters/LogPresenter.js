import LogView from "../views/LogView"
import { fetchAlbum } from "../slices/albumSlice";
import { addToWish, handleList } from "../slices/listSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        logs: state.log.logs,
        name: state.user.userName,
        imageURL: state.user.userImageURL,
        lists: state.list.lists
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id)),
        onAddToWish: (res) => {dispatch(addToWish(res));},
        onAddToList: (exists, name, album) => {dispatch(handleList(exists, name, album));}
    };
}


const LogPresenter = connect(mapStateToProps, mapDispatchToProps)(LogView)

export default LogPresenter;
