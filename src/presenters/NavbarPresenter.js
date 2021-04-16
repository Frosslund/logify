import { initiateSearch, clearSearch } from "../slices/searchSlice";
import { setLoggedIn } from "../slices/userSlice";
import Navbar from "../views/Navbar";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSearch: x => dispatch(initiateSearch(x)),
        clearSearch: () => dispatch(clearSearch()),
        logOutUser: () => dispatch(setLoggedIn(false))
    };
}

const NavbarPresenter = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default NavbarPresenter;
    