import { initiateSearch, clearSearch } from "../slices/searchSlice";
import Navbar from "../views/Navbar";
import { connect } from "react-redux";

/* const mapStateToProps = (state) => {
    return {
        albums: state.search.albums,
        artists: state.search.artists,
        topResult: state.search.topResult
    };
} */

const mapDispatchToProps = (dispatch) => {
    return {
        doSearch: x => dispatch(initiateSearch(x)),
        clearSearch: () => dispatch(clearSearch())
    };
}

const NavbarPresenter = connect(null, mapDispatchToProps)(Navbar)

export default NavbarPresenter;
    