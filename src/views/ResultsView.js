import { NavLink } from 'react-router-dom';
import _ from 'lodash'; 

const ResultsView = ({albums, artists, topResult, user, setAlbum, setArtist}) => {
	return (
		<div>
			{artists.length === 0 ?
			<div className="no_search_text">
				{localStorage.loggedIn ? 
				<div>
					<div>
						Welcome <span className="no_search_text__username">{user}</span>
					</div>
					<div className="no_search_text__subtext">Search for albums and artists!</div>
				</div>
				:
				<div>
					<div>
						Welcome to <span className="no_search_text__username">Logify</span>
					</div>
					<div className="no_search_text__subtext">Please login to start logging!</div>
				</div>
				}
			</div>
			:
			<div>
				<h2 className="gallery__header">Top Result:</h2>
				{topResult.type === "album" ?
				<div className="gallery gallery_top">
					<NavLink
						to={`/album/${topResult.id}`}
						key={topResult.id}
						onClick={() => setAlbum(topResult)}
						className="gallery__item gallery_top__topresult"
					>
						<div className="gallery__item__wrapper">
							{!_.isEmpty(topResult.images) ? 
							<img
								src={topResult.images[1].url}
								className="gallery_top__topresult__photo"
								alt="Album img"
							/>
							:
							<span></span>		
							}
						</div>
						<div className="gallery__item__info">
							<div className="gallery__item__info--name">
								{topResult.name}
							</div>
							<div className="gallery__item__info--artist">
								{topResult.artists[0].name}
							</div>
							<div className="gallery__item__info--year">
								{topResult.release_date.slice(0, 4)}
							</div>
						</div>
					</NavLink>
				</div>
				:
				<div className="gallery gallery_top">
					<NavLink
						to="#"
						key={topResult.id}
						className="gallery__item gallery_top__topresult"
					>
						<div className="gallery__item__wrapper">
							{!_.isEmpty(topResult.images) ? 
							<img
								src={topResult.images[1].url}
								className="gallery_top__topresult__photo"
								alt="Album img"
							/>
							:
							<span></span>		
							}
							
						</div>
						<div className="gallery__item__info">
							<div className="gallery__item__info--name">
								{topResult.name}
							</div>
							<div className="gallery__item__info--genres">
								{topResult.genres.toString()}
							</div>
						</div>
					</NavLink>
				</div>
				}
				<h2 className="gallery__header">Albums:</h2>
				<div className="gallery">
					{albums.slice(0, 8).map(album => (
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
				
				<h2 className="gallery__header">Artists:</h2>
				<div className="gallery">
					{artists.slice(0, 8).map(artist => (
						<NavLink
							to={`/artist/${artist.id}`}
							onClick={() => setArtist(artist.id)}
							key={artist.id}
							className="gallery__item"
						>
							<div className="gallery__item__wrapper">
								{!_.isEmpty(artist.images) ? 
								<img
									src={artist.images[1].url}
									className="gallery__item__photo"
									alt="Album img"
								/>
								:
								<span></span>		
								}
								
							</div>
							<div className="gallery__item__info">
								<div className="gallery__item__info--name">
									{artist.name}
								</div>
								<div className="gallery__item__info--genres">
									{artist.genres.slice(0, 2).join(', ')}
								</div>
							</div>
						</NavLink>
					))}
				</div>	
			</div>
			}
		</div>
	);
}

export default ResultsView;