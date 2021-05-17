import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router-dom';

const AddToLogComponent = ({ album, name, images, released, artists, close, onAddToLog }) => {

    const [logState, setLogState] = useState({
        rating: 0,
        review: "",
        complete: false
    });

    const handleRating = (newRating) => {
		setLogState({ ...logState, rating: newRating })
        console.log(logState)
	};

    const handleReview = (newReview) => {
        setLogState({ ...logState, review: newReview })
        console.log(logState)
    }

    const handleSubmit = () => {
        if (logState.rating !== 0) {
            onAddToLog({...album, ...logState })
            setLogState({...logState, complete: true})
            /* close(); */
        } else {
            console.log("Fill in rating!");
        }
    }

    return (
        <div className="popup">
            <button className="popup__close" onClick={close}>
            &times;
            </button>
            <img className="popup__image" src={images[1].url}  alt="" />
            {!logState.complete ?
            <div className="popup__content">
                <h3>{name}    		<span>		{released}</span></h3>
                <p>{artists.map(artist => {return artist.name + " "})}</p>
                
                <h4>Rating:</h4>
                <ReactStars
                    className="popup__rating"
                    count={5}
                    onChange={handleRating}
                    size={40}
                    activeColor="#1db954"
                />

                <textarea onChange={e => handleReview(e.target.value)} value={logState.review} placeholder="Add review.." cols="60" rows="10"></textarea>

                <button className="saveButton" onClick={handleSubmit}>SAVE</button>
            </div>
            :
            <div className="popup__content">
                <p>Album added to log!</p>
                <NavLink to="/log" className="logactionbuttons">Go to your log</NavLink>
                <button className="logactionbuttons" onClick={() => close()}>Close</button>
            </div>
            }
        </div>
    )
}

export default AddToLogComponent
