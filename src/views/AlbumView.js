
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
		onAddToLog 
	} = props;

	return (
		<div class="albumView">
			<div class="top">
				<img class="image" src={images[0].url}  alt="" />
				
				<div class="title">
					<h4>ALBUM</h4>
					<h1 class="tighter">{name.toUpperCase()}</h1>
					<h3 class="normal">{artists.map(artist => {return artist.toUpperCase() + " "})} ∘ {released} ∘ {totalTracks} songs ∘ {Math.round(runningTime_ms/1000/60)} min</h3>
					<table class="trackTable">
						<tr class="firstRow">
							<th>#</th>
							<th>TITLE</th>
							<th>DURATION</th>
						</tr>
						{tracks.map(track => {
							return (
								<tr key={track.track_number}>
									<td>{track.track_number}</td>
									<td>{track.name.toUpperCase()}</td>
									<td>{(track.duration_ms/1000/60).toFixed(2).toString().replace(".", ":")}</td>
								</tr>
							)}
						)}
					</table>
				</div>
				
			</div>
			<button class="toLogButton" onClick={() => onAddToLog({name, artists, tracks, totalTracks, images, released, runningTime_ms, popularity, id})}>
					ADD TO LOG
				</button>
		</div>
		
	)
}

export default AlbumView;


