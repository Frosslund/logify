
const AlbumView = (props) => {
    
    const { 
        name,
        artists,
        tracks,
        totalTracks,
        images,
        released,
        runningTime,
        popularity } = props;

    return (
        <div>
            <img src={images[0].url} alt='' />
            <h1>{`Album: ${name} ${released}`}</h1>
            <h2>Artists: {artists.map(artist => {return artist})}
            </h2>
            <h2> Total running time: {runningTime/1000/60} </h2>
            <h2> Total tracks: {totalTracks} </h2>
            Tracks: {tracks.map(track => {return <h5 key={track.track_number}>{`${track.name} ${track.duration_ms/1000/60}`}</h5>})}
        </div>
    )
}

export default AlbumView;


