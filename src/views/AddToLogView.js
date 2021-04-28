import ReactStars from "react-rating-stars-component";

const AddToLogView = ({ name, images, released, artists, close, onAddToLog }) => {

    const ratingChanged = (newRating) => {
		console.log(newRating);
	};

    return (
        <div className="popup">
            <button className="popup__close" onClick={close}>
            &times;
            </button>
            <img className="popup__image" src={images[1].url}  alt="" />

            <div className="popup__content">
                <h3>{name}    		<span>		{released}</span></h3>
                <p>{artists.map(artist => {return artist + " "})}</p>
                
                <h4>Rating:</h4>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={40}
                    activeColor="#1db954"
                />

                <textarea name="" id="" placeholder="Add review.." cols="60" rows="10"></textarea>

                <button className="saveButton">SAVE</button>
            </div>

        </div>
    )
}

export default AddToLogView
