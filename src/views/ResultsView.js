import { NavLink } from 'react-router-dom';
import _ from 'lodash'; 
import { handleLogin } from '../utils/handleLogin';
import LoadingSpinner from "./components/LoadingSpinner";

const ResultsView = ({albums, artists, topResult, newReleases, loading, user, setAlbum, getNewReleases, onAddToLog, setArtist }) => {

	if (newReleases.length === 0) {
		getNewReleases();
	}

	const openAlbum = (url) => {
		window.open(url, "_blank");
	} 

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
					{loading ?
					<LoadingSpinner />
					:
					<div>
					<h2 className="new-releases__header">New Releases:</h2>
					<div className="new-releases">
						{newReleases.length !== 0 ?
						newReleases.albums.slice(0, 5).map(release => {
							return (
								<div className="new-releases__item">
									<NavLink
										to={`/album/${release.id}`}
										key={release.id}
										onClick={() => setAlbum(release)}
									>
										<img src={release.images[1].url} alt=""/>
									</NavLink>	
									<NavLink
										to={`/artist/${release.artists[0].id}`}
										onClick={() => setArtist(release.artists[0].id)}
										key={release.artists[0].id}
									>						
										<p className="new-releases__item__artist" alt="">{release.artists[0].name}</p>
									</NavLink>	
									<NavLink style={{ textDecoration: 'none', color: 'inherit' }}
										to={`/album/${release.id}`}
										key={release.id+" "}
										onClick={() => setAlbum(release)}
									>
										<p className="new-releases__item__album">{release.name}</p>
									</NavLink>
									<div className="new-releases__item__buttons">
										<button onClick={() => openAlbum(`spotify:album:${release.id}`)} className="new_releases__item__link"><i class="fab fa-spotify"></i></button>			
									</div>
								</div>
							);
						})
						:
						<span></span>
						}
					</div>
					</div>
					}
				</div>
				:
				<div>
					<div>
						Welcome to <span className="no_search_text__username">Logify</span>
					</div>
					<div className="no_search_text__subtext">Please login to start logging!</div>
					<div className="no_search_text__subtext">
						<button onClick={handleLogin} className="saveButton loginButton">
							Login with Spotify
						</button>
					</div>
				</div>
				}
			</div>
			:
			loading ?
			<LoadingSpinner />
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