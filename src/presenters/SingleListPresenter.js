import { connect } from "react-redux";
import SingleListView from "../views/SingleListView"; 
import { removeFromCurrentList, createPlaylist } from "../slices/listSlice";
import { fetchAlbum } from "../slices/albumSlice";

const mapStateToProps = (state) => {
    return {
        currentList: state.list.currentList,
        loading: state.list.loading,
        user: state.user.userId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCurrentList: (res) => {dispatch(removeFromCurrentList(res))},
        createPlaylist: (user, list) => {dispatch(createPlaylist(user, list))},
        setAlbum: id => dispatch(fetchAlbum(id))
    };
}

const SingleListPresenter = connect(mapStateToProps, mapDispatchToProps)(SingleListView)

export default SingleListPresenter;
