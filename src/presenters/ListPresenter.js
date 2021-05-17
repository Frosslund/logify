import ListView from "../views/ListView";
import { connect } from "react-redux";
import { setCurrentList } from "../slices/listSlice";

const mapStateToProps = (state) => {
    return {
        wishlist: state.list.wishlist,
        lists: state.list.lists,
        loading: state.list.loading,
        name: state.user.userName,
        imageURL: state.user.userImageURL
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentList: (res) => {dispatch(setCurrentList(res))}
    };
}

const ListPresenter = connect(mapStateToProps, mapDispatchToProps)(ListView)

export default ListPresenter;
