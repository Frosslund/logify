
const AlbumView = (props) => {
	
	const { 
		name,
		artists,
		tracks,
		totalTracks,
		images,
		released,
		runningTime_ms,
		popularity 
	} = props;

	/* const {
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
	} = props = {
		id: "0ETFjACtuP2ADo6LFhL6HN",
		name: "Abbey Road (Remastered)",
		artists: ["The Beatles"],
		tracks: [
			{
				name:"Come together - Remastered 2009",
				track_number: 1,
				duration_ms: 259946
			},
			{
				name:"Something - Remastered 2009",
				track_number: 2,
				duration_ms: 182293
			},
			{
				name: "Maxwell's Silver Hammer - Remastered 2009",
				track_number: 3,
				duration_ms: 207920
			},
			{
				name: "Oh! Darling - Remastered 2009",
				track_number: 4,
				duration_ms: 207922
			},
			{
				name: "Octopus's Garden - Remastered 2009",
				track_number: 5,
				duration_ms: 207910
			},
			{
				name: "I Want You (She's So Heavy) - Remastered 2009",
				track_number: 6,
				duration_ms: 206920
			},
			{
				name: "Here Comes the Sun - Remastered 2009",
				track_number: 7,
				duration_ms: 207520
			},
			{
				name: "Because - Remastered 2009",
				track_number: 8,
				duration_ms: 207320
			},
			{
				name: "You Never Give Me Your Money - Remastered 2009",
				track_number: 9,
				duration_ms: 107920
			},
			{
				name: "Sun King - Remastered 2009",
				track_number: 10,
				duration_ms: 208920
			},
			{
				name: "Mean Mr. Mustard - Remastered 2009",
				track_number: 11,
				duration_ms: 20920
			},
			{
				name: "Polythene Pam - Remastered 2009",
				track_number: 12,
				duration_ms: 27920
			},
			{
				name: "She Came in Through the Bathroom Window - Remastered 2009",
				track_number: 13,
				duration_ms: 20790
			},
			{
				name: "Golden Slumbers - Remastered 2009",
				track_number: 14,
				duration_ms: 20720
			},
			{
				name: "Carry That Weight - Remastered 2009",
				track_number: 15,
				duration_ms: 27920
			},
			{
				name: "The End - Remastered 2009",
				track_number: 16,
				duration_ms: 20920
			},
			{
				name: "Her Majesty - Remastered 2009",
				track_number: 17,
				duration_ms: 7920
			}
			
			
		],
		totalTracks: 17,
		images: [
			{
				height: 640,
				url: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
				width: 640
			}
		],
		released: "1969",
		runningTime_ms: 2849701,
		popularity: 83
	}; */

	return (
		<div class="albumView">
			<div class="top">
				<img class="image" src={images[0].url}  alt="" />
				<div class="title">
					<h4 class="tighter">ALBUM</h4>
					<h1 class="tighter">{name}</h1>
					<h3 class="normal">{artists.map(artist => {return artist + " "})} ∘ {released} ∘ {totalTracks} songs ∘ {Math.round(runningTime_ms/1000/60)} min</h3>
					<table>
						<tr>
							<th>#</th><th>Titel</th><th>Duration</th>
						</tr>
						{tracks.map(track => {
							return (
								<tr>
									<td>{track.track_number}</td>
									<td>{track.name}</td>
									<td>{(track.duration_ms/1000/60).toFixed(2).toString().replace(".", ":")}</td>
								</tr>
							)}
						)}
					</table>
				</div>
			</div>
			<div>
				<button onClick={() => console.log(
						{
						album: props,
						rating: 4.5,
						review: "string"
						}
					)}>
					<p>Add to Log!</p>
				</button>
			</div>
		</div>
		
	)
}

export default AlbumView;


