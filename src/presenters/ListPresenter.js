import ListView from "../views/ListView";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        wishlist: state.list.wishlist,
        name: state.user.userName,
        imageURL: state.user.userImageURL
    };
}

const ListPresenter = connect(mapStateToProps, null)(ListView)

export default ListPresenter;
