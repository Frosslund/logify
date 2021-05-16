import { NavLink } from 'react-router-dom';
import _ from 'lodash'; 

const ArtistView = (props) => {

	const {
		artist,
		relatedArtists,
		setAlbum,
		setArtist
	} = props;

    return (
      <div>
				<div class="artistInfo">
					<img alt="" src={artist.image.url} />
					<div class="artistName">
						<h1>{artist.name}</h1>
					</div>
					<div class="vl"></div>
					<div class="relatedArtists">
						<h3>Related artists:</h3>
						{relatedArtists.map(artist => (
							<NavLink
								to={`/artist/${artist.id}`}
								onClick={() => setArtist(artist.id)}
								key={artist.id}
							>
								<div class="each">
									<img alt="" src={artist.images[0].url} /> 
									<span class="name">
										{artist.name}
									</span>
								</div>
							</NavLink>
						))}
					</div> 
				</div>
        <h2 className="gallery__header">Albums:</h2>
				<div className="gallery">
					{artist.albums.map(album => (
						<NavLink
							to={`/album/${album.id}`}
							onClick={() => setAlbum(album)}
							key={album.id}
							className="gallery__item"
						>
						<div className="gallery__item__wrapper">
							{!_.isEmpty(album.images) ? 
							<img
								src={album.images[1].url}
								className="gallery__item__photo"
								alt="Album img"
							/>
							:
							<span></span>		
							}	
						</div>
						<div className="gallery__item__info">
							<div className="gallery__item__info--name">
								{album.name}
							</div>
							<div className="gallery__item__info--artist">
								{album.artists[0].name}
							</div>
							<div className="gallery__item__info--year">
								{album.release_date.slice(0, 4)}
							</div>
						</div>
					</NavLink>
				))}
			</div>
    </div>
  )
}

export default ArtistView;


