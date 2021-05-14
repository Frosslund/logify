import { connect } from "react-redux";
import SingleListView from "../views/SingleListView"; 
import { removeFromCurrentList, createPlaylist } from "../slices/listSlice";

const mapStateToProps = (state) => {
    return {
        currentList: state.list.currentList,
        user: state.user.userId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCurrentList: (res) => {dispatch(removeFromCurrentList(res))},
        createPlaylist: (user, list) => {dispatch(createPlaylist(user, list))}
    };
}

const SingleListPresenter = connect(mapStateToProps, mapDispatchToProps)(SingleListView)

export default SingleListPresenter;
