import { useState } from "react";
import ReactTooltip from "react-tooltip";

const SingleListView = ({ currentList, user, removeFromCurrentList, createPlaylist }) => {

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
    for (let i = 3; i < currentList.albums.length; i += 4) {
        result = insert(result, i, {})
    }

	return (
        <div>
            <div class="singleListView">
                <div className="singleListView__infobox">
                    <h1>{currentList.name}</h1>
                    <p>{currentList.albums.length} albums</p>

                    <button onClick={() => toggleEdit()}>{editMode ? "Save" : "Edit List"}</button>
                    <button onClick={(user, currentList) => createPlaylist(user, currentList)}>Create Spotify Playlist</button>
                </div>
                {result.map((album, idx) => {                    
                    return (                      
                        <div className="singleListView__item">
                                {Object.keys(album).length !== 0 ?
                                <span>                     
                                    {editMode ? <button onClick={(album) => removeFromCurrentList(album)} className="singleListView__deleteButton">x</button> : null}
                                    <img src={album.images[1].url} data-tip data-for={album.name} alt=""/>
                                    <p>{idx + 1}</p>
                                    <ReactTooltip id={album.name} place="top" effect="solid">
                                        {album.name} by {album.artists[0]}
                                    </ReactTooltip>
                                </span>   
                                :
                                <span></span>
                                }
                        </div>  
                                        
                    )                    
                })}
            </div>
        </div>
	);
}

export default SingleListView;