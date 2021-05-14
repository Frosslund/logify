import Paper from '@material-ui/core/Paper';
import { RowDetailState, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableRowDetail } from '@devexpress/dx-react-grid-material-ui';
import { NavLink } from 'react-router-dom';

import UserInfo from "./components/UserInfo";
import calcRunningTime from "../utils/calcRunningTime";


const LogView =  (props) => {

  const {
		logs,
		name,
		imageURL,
    setAlbum
	} = props;

  const RowDetail = ({ row }) => (
    <div class="collapseContent">
      {console.log(row.log)}
      <div class="albumInfoLog">
        <h6>ALBUM</h6>
        <NavLink to={`/album/${row.log.album.id}`} onClick={() => setAlbum(row.log.album)} key={row.log.album.id} >
          <h3>{row.log.album.name}</h3>
        </NavLink>
        <h5 class="artistLog">
          <p>{row.log.album.artists.map(artist => {return artist + " "})}</p>
          <p>{row.log.album.totalTracks} songs</p>
          <p>{calcRunningTime(row.log.album.runningTime_ms)}</p>
        </h5>
        <p class="buttons">
          <button class="button">
            Add to list
          </button>
          <button class="button" onClick="${row.log.album.externalUrl}">
            Continue to Spotify
          </button>
        </p>
      </div>
      <div>
        <img alt="" src={row.log.album.images[1].url} />
      </div>
      <div class="reviewLog">
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
    { name: 'relisten', title: 'Relisten\u0020\u21A9' }
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
          relisten: logs[i].firstListen === true ? "" : "\u21A9",
          log: logs[i]
        }
      ); 
    }
    return allRows;
  }

  const info = `Logged albums: ${logs.length}`

  return (
    <div class="logView">
      <UserInfo name={name} imageURL={imageURL} info={info} />
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
  );
};

export default LogView;