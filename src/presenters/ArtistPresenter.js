import { fetchAlbum } from "../slices/albumSlice";
import { fetchArtist } from "../slices/artistSlice";
import ArtistView from "../views/ArtistView"
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        artist: state.artist.artist,
        relatedArtists: state.artist.relatedArtists,
        loading: state.artist.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlbum: id => dispatch(fetchAlbum(id, true)),
        setArtist: id => dispatch(fetchArtist(id))
    };
}

const ArtistPresenter = connect(mapStateToProps, mapDispatchToProps)(ArtistView)

export default ArtistPresenter;
    