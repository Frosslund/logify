import Popup from 'reactjs-popup';
import calcRunningTime from "../utils/calcRunningTime";
import AddToLogComponent from "./components/AddToLogComponent";
import AddToListComponent from "./components/AddToListComponent";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const AlbumView = (props) => {

	const {
		id,
		name,
		artists,
		tracks,
		totalTracks,
		images,
		released,
		runningTime_ms,
		popularity,
		externalUrl,
		lists,
		onAddToLog,
		onAddToWish,
		onAddToList,
		setArtist
	} = props;

	var playing = false;
	const [albumAdded, setAlbumAdded] = useState(false);
	//let albumAdded = false;

	const openAlbum = (url) => {
		window.open(url, "_blank");
	}; 

	const handleAlbumAdded = () => {
		setAlbumAdded(true);
		setTimeout(() => {
			setAlbumAdded(false);
		}, 3000);
	}
	var songs = {}
	
	return (
		<div class="albumView">
			<div class="top">
				<img class="image" src={images[0].url}  alt="" />
				<div class="title">
					<h4>ALBUM</h4>
					<h1 class="tighter">{name}</h1>
					<h3 class="normal">
						{artists.map(artist => {
            				return (
              					<NavLink to={`/artist/${artist.id}`} onClick={() => setArtist(artist.id)} key={artist.id} >
                					{artist.name + "\u0020"}
              					</NavLink>
            				)
          				})}
						<span>&#x02022;</span> 
						{released} 
						<span>&#x02022;</span> 
						{totalTracks} songs 
						<span>&#x02022;</span> 
						{calcRunningTime(runningTime_ms)} 
					</h3>
					<table class="trackTable">
						<tr class="firstRow">
							<th>#</th>
							<th>TITLE</th>
							<th>
								<span class="clock"><i class="far fa-clock"></i></span>
							</th>
							<th>
								<span class="play">&#9835;</span>
							</th>
						</tr>
						{tracks.map(track => {
							
							var id = track.id;
							songs[id] = {
								song: new Audio(track.preview_url),
								currentlyPlaying: false
							};
							
							
							const play = () => {
								if (playing) {
									if (songs[id].currentlyPlaying) {
										songs[id].song.pause();
										songs[id].currentlyPlaying = false;
										playing = false;
									} else {
										for (let idx in songs) {
											if (songs[idx].currentlyPlaying) {
												songs[idx].song.pause();
												songs[idx].currentlyPlaying = false;
												songs[id].song.play();
												songs[id].currentlyPlaying = true;
											}
										}
									} 
								} else {
									songs[id].song.play();
									songs[id].currentlyPlaying = true;
									playing = true;
								}		
							}
							
							const track_min = Math.ceil(track.duration_ms/1000)
							return (
								<tr key={track.id}>
									<td><span class="number">{track.track_number}</span></td>
									<td>{track.name}</td>
									<td>{Math.floor(track_min/60)}:{track_min%60 >= 10 ? track_min%60 : (track_min%60).toString().padStart(2, "0")}</td>
									<td><button class="playButton" onClick={play}>&#5125;</button></td>
								</tr>
							)}
						)}
					</table>
				</div>
				<Popup
				trigger={<button> Log <i class="fas fa-pencil-alt"></i></button>}
				modal
				nested
				>
					{close => (
						<AddToLogComponent album={{name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id, externalUrl}} name={name} images={images} released={released} artists={artists} close={close} onAddToLog={onAddToLog} />
					)}
				</Popup>
				<Popup
					trigger={<button>List <i class="fas fa-list"></i></button>}
					modal
					nested
				>
					{close => (
						<AddToListComponent 
							album={{name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id}} 
							name={name} 
							images={images} 
							released={released} 
							artists={artists} 
							close={close} 
							lists={lists}
							onAddToWish={onAddToWish}
							onAddToList={onAddToList} 
						/>
					)}
				</Popup>
				<button className="listen-later-button" onClick={() => {onAddToWish({name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id}); handleAlbumAdded();}}>
					Later <i class="far fa-clock"></i>
				</button>
				<button onClick={() => openAlbum(`spotify:album:${id}`)} className="listen-spotify-button"><i class="fab fa-spotify"></i></button>
				<p className={`later-prompt__${albumAdded ? "visible" : "hidden"}`}>Album added to "Listen Later"!</p>
			</div>
		</div>
		
	)
}

export default AlbumView;


