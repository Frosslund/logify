import Popup from 'reactjs-popup';
import AddToLogComponent from "./components/AddToLogComponent";
import AddToListComponent from "./components/AddToListComponent";

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
		onAddToList
	} = props;

	console.log(externalUrl)

	// fixing runnig time string
	const runningTime_min = Math.ceil(runningTime_ms/1000/60);
	const runningTime = runningTime_min > 60 ? (Math.floor(runningTime_min/60)).toString() + " hr " + (runningTime_min%60).toString() + " min" : runningTime_min.toString() + " min"

	var playing = false;
	var songs = {}
	
	return (
		<div class="albumView">
			<div class="top">
				<img class="image" src={images[0].url}  alt="" />
				<div class="title">
					<h4>ALBUM</h4>
					<h1 class="tighter">{name}</h1>
					<h3 class="normal">
						{artists.map(artist => {return artist + " "})} <span>&#x02022;</span> {released} <span>&#x02022;</span> {totalTracks} songs <span>&#x02022;</span> {runningTime} 
					</h3>
					<table class="trackTable">
						<tr class="firstRow">
							<th>#</th>
							<th>TITLE</th>
							<th>
								<span class="clock">&#9719;</span>
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
			</div>
			<button className="toLogButton" onClick={() => onAddToLog({name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id})}>
					ADD TO LOG &#10004;
			</button>
			<Popup
				trigger={<button class="toLogButton"> ADD TO LOG NOT WORKING &#10004;</button>}
				modal
				nested
			>
				{close => (
					<AddToLogComponent album={{name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id}} name={name} images={images} released={released} artists={artists} close={close} onAddToLog={onAddToLog} />
				)}
			</Popup>
			<Popup
				trigger={<button class="toLogButton"> ADD TO LIST NOT WORKING &#10004;</button>}
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
      <button className="toLogButton" onClick={() => onAddToWish({name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id})}>
        LISTEN LATER
      </button>	
		</div>
		
	)
}

export default AlbumView;


