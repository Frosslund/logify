import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AddToListComponent = ({ album, name, images, released, artists, close, lists, onAddToWish, onAddToList }) => {

    const [listState, setListState] = useState({ 
        name: "Select list..", 
        newName: "",
        show: false,
        error: false,
        nameError: false,
        alreadyExistError: false,
        complete: false
    });

    const currentListNames = []
    lists.forEach(list => {
        currentListNames.push(list.name)
    })

    const handleSelect = (e) => {
		setListState({...listState, name: e, error: false})
	};

    const checkList = (album, listOfAlbums) => {
        let returnValue = false;
        listOfAlbums.forEach(specAlbum => {
            if(specAlbum.id === album.id) {
                returnValue = true;
            }
        });
        return returnValue;
    }

    const handleInitialSubmit = () => {
        let errorValue = false;
        lists.forEach(list => {
            if (list.name === listState.name && checkList(album, list.albums)) {
                setListState({...listState, error: true, alreadyExistError: true})
                errorValue = true;
            };
        });
        if (errorValue) {
            return;
        } else {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (!currentListNames.includes(listState.newName)) {
            if (listState.name !== "Select list.." || listState.newName !== "") {
                listState.newName !== "" ? 
                onAddToList(false, listState.newName, album)
                :
                onAddToList(true, listState.name, album)
                ;
                /* close() */
                setListState({...listState, complete: true})
            } else {
                setListState({...listState, error: true})
            }
        } else {
            setListState({...listState, error: true, nameError: true})
        }
    }

    const handleInput = (e) => {
        setListState({...listState, name: "Select list..", newName: e, error: false})
    }

    const handleNewClick = () => {
        setListState({...listState, show: true})
    }

    const handleNewClickUndo = () => {
        setListState({...listState, show: false})
    }
    return (
        <div className="popup">
            <button className="popup__close" onClick={close}>
            &times;
            </button>
            <img className="popup__image" src={images[1].url}  alt="" />

            {!listState.complete ?
            <div className="popup__content">
                <h3>{name}    		<span>		{released}</span></h3>
                <p>{artists.map(artist => {return artist + " "})}</p>

                {lists.length > 0 ? <h4>ADD ALBUM TO LIST:</h4> : <span></span>}
                <div>
                    {lists.length > 0 ? <select selected="selected" onClick={handleNewClickUndo} className="popup__list-select" value={listState.name} onChange={e => handleSelect(e.target.value)}>
                        <option key={0} value="Select list.." selected="true" defaultValue>Select list..</option>
                        {lists.map((list) => 
                            <option key={list.id} value={list.name}>{list.name}</option>
                        )}
                    </select> : <p>You currently have no lists!</p>}
                </div>

                <div>
                    {lists.length > 0 ? <span>OR</span> : <span></span>}{listState.show ? 
                    <input autoFocus className="popup__new-list-input" placeholder="Select name.." value={listState.newName} onChange={e => handleInput(e.target.value)}></input>
                    :
                    <div id="btn" onClick={handleNewClick}><span className="popup__new-list-button">Create new list</span><div id="circle"></div></div>
                    }
                </div>

                <button className="saveButton" onClick={handleInitialSubmit}>SAVE</button>{listState.error ? <span className="popup__list-error-message">{listState.nameError ? "A list with this name already exists, please select another name!" : listState.alreadyExistError ? "You already have this album in the chosen list!" : "Please select a list or create a new one!"}</span> : <span></span>}
            </div>
            :
            <div className="popup__content">
                <p>Album added to {listState.newName === "" ? `list ${listState.name}` : `new list ${listState.newName}`}</p>
                <NavLink to="/lists" className="logactionbuttons">Go to your lists</NavLink>
                <button className="logactionbuttons" onClick={() => close()}>Close</button>
            </div>
            }

        </div>
    )
}

export default AddToListComponent
