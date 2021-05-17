import Paper from '@material-ui/core/Paper';
import { RowDetailState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';

import UserInfo from "./components/UserInfo";
import calcRunningTime from "../utils/calcRunningTime";
import AddToListComponent from "./components/AddToListComponent";


const LogView =  (props) => {

  const {
		logs,
		name,
		imageURL,
    setAlbum,
    setArtist,
    lists,
    onAddToWish,
    onAddToList
	} = props;

  const openAlbum = (url) => {
      window.open(url, "_blank");
  }; 

  const RowDetail = ({ row }) => (

    <div className="collapseContent">
      <div className="albumInfoLog">
        <h6>ALBUM</h6>
        <NavLink to={`/album/${row.log.album.id}`} onClick={() => setAlbum(row.log.album)} key={row.log.album.id} >
          <h3>{row.log.album.name}</h3>
        </NavLink>
        <h5 class="artistLog">
          {row.log.album.artists.map(artist => {
            return (
              <NavLink to={`/artist/${artist.id}`} onClick={() => setArtist(artist.id)} key={artist.id} >
                {artist.name + "\u0020"}
              </NavLink>
            )
          })}
          <p>{row.log.album.totalTracks} songs</p>
          <p>{calcRunningTime(row.log.album.runningTime_ms)}</p>
        </h5>
        <p className="buttons">
        <Popup
          trigger={<button className="button">List <i class="fas fa-list"></i></button>}
          modal
          nested
        >
            {close => (
              <AddToListComponent 
                album={{...row.log.album}} 
                name={row.log.album.name} 
                images={row.log.album.images} 
                released={row.log.album.released} 
                artists={row.log.album.artists} 
                close={close} 
                lists={lists}
                onAddToWish={onAddToWish}
                onAddToList={onAddToList} 
              />
            )}
          </Popup>
          <button className="button" onClick={() => openAlbum(`spotify:album:${row.log.album.id}`)}>
            <i class="fab fa-spotify"></i>
          </button>
        </p>
      </div>
      <div>
        <img alt="" src={row.log.album.images[1].url} />
      </div>
      <div className="reviewLog">
        <h5>Review:</h5>
        <p>{row.log.review === "" ? "No review yet, ready to add one?" : `"${row.log.review}"`}</p>
      </div>
    </div>
  );

  

  const columns = [
    { name: 'date', title: 'Added' },
    { name: 'album', title: 'Album' },
    { name: 'year', title: 'Released' },
    { name: 'rating', title: 'Rating' },
    { name: 'relisten', title: <i class="fas fa-history"></i>}
  ];

  function rowFix(logs) {
    const allRows = [];
    const stars = {
      1: "\u2605",
      2: "\u2605\u0020\u2605",
      3: "\u2605\u0020\u2605\u0020\u2605",
      4: "\u2605\u0020\u2605\u0020\u2605\u0020\u2605",
      5: "\u2605\u0020\u2605\u0020\u2605\u0020\u2605\u0020\u2605"
    };
    for (let i = 0; i < logs.length; i++) {
      allRows.push(
        {
          date: logs[i].dateAdded,
          album: <img class="logPic" alt="" src={logs[i].album.images[2].url} />,
          year: logs[i].album.released,
          rating: stars[Math.ceil(logs[i].rating)],
          relisten: logs[i].firstListen === true ? "" : <i class="fas fa-history"></i>,
          log: logs[i]
        }
      ); 
    }
    return allRows;
  }

  const info = `Logged albums: ${logs.length}`

  return (
    <>
    <UserInfo name={name} imageURL={imageURL} info={info} />
    <div class="logView">
      <Paper square={false} >
        <Grid 
          rows={rowFix(logs)}
          columns={columns}
        >
          <RowDetailState
            defaultExpandedRowIds={[]}
          />
          <SortingState
            defaultSorting={[{ columnName: 'date', direction: 'desc' }]}
            columnExtensions={
              [
                { columnName: 'album', sortingEnabled: false }, 
                { columnName: 'relisten', sortingEnabled: false }
              ]
            }
          />
          <IntegratedSorting />
          <Table />
          <TableHeaderRow showSortingControls />
          <TableRowDetail
            contentComponent={RowDetail}
          />
        </Grid>
      </Paper>
    </div>
    </>
  );
};

export default LogView;