import LogView from "../views/LogView"
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        logs: state.log.logs
    };
}

/* const mapDispatchToProps = (dispatch) => {
    return {
        onAddToLog: (res) => dispatch(addToLog({...res, id: Date(), dateAdded: Date()}))
    };
} */

const LogPresenter = connect(mapStateToProps, null)(LogView)

export default LogPresenter;
