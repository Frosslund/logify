import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

const SingleListView = ({ currentList, user, removeFromCurrentList, createPlaylist, setAlbum, loading }) => {

    window.scrollTo(0, 0);
    const [editMode, setEditMode] = useState(false);

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    const insert = (arr, index, newItem) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index)
      ]
    
    let result = currentList.albums
    let albumIndices = [...Array(currentList.albums.length).keys()].slice(1)
    albumIndices.push(currentList.albums.length)

    for (let i = 3; i <= currentList.albums.length * 10; i += 4) {
        albumIndices.splice(i, 0, i);
        result = insert(result, i, {});
    }

	return (
        <div>
            {loading ?
            <LoadingSpinner />
            :
            <div class="singleListView">
                <div className="singleListView__infobox">
                    <h1>{currentList.name}</h1>
                    <p>{currentList.albums.length} albums</p>

                    <button onClick={() => toggleEdit()}>{editMode ? "Save" : "Edit List"}</button>
                    <button onClick={() => createPlaylist(user, currentList)}>Create Spotify Playlist</button>
                </div>
                {result.map((album, idx) => {                    
                    return (                      
                        <div className="singleListView__item">
                                {Object.keys(album).length !== 0 ?
                                <span>                     
                                    {editMode ? <button onClick={() => removeFromCurrentList(album)} className="singleListView__deleteButton">x</button> : null}
                                    <NavLink to={`/album/${album.id}`} onClick={() => setAlbum(album)}>
                                        <img src={album.images[1].url} data-tip data-for={album.name} alt=""/>
                                    </NavLink>
                                    <p>{albumIndices[idx]}</p>
                                    <ReactTooltip id={album.name} place="top" effect="solid">
                                        {album.name} by {album.artists[0].name}
                                    </ReactTooltip>
                                </span>   
                                :
                                <span></span>
                                }
                        </div>  
                                        
                    )                    
                })}
            </div>
            }
        </div>
	);
}

export default SingleListView;