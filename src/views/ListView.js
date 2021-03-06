import UserInfo from "./components/UserInfo";
import { NavLink } from 'react-router-dom';
import LoadingSpinner from "./components/LoadingSpinner";

const ListView = ({wishlist, lists, name, imageURL, setCurrentList, loading}) => {
	
	const info = [`Lists: ${lists.length}`, `Albums in Listen Later: ${wishlist.length}`]

	const classes = ["top", "middle-one", "middle-two", "bottom"]
	let blackBoxes = []
	let albumBoxes = []
	if (wishlist.length < 4) {
		blackBoxes = classes.slice(Math.max(wishlist.length, 0), 4)
		albumBoxes = classes.slice(0, wishlist.length)
	} else {
		albumBoxes = classes.slice(0, 4)
	}

	let listAlbumBoxes = []
	let listBlackBoxes = []
	
	lists.forEach(list => {
		if (list.albums.length < 4) {
			listBlackBoxes.push(classes.slice(Math.max(list.albums.length, 0), 4))
			listAlbumBoxes.push(classes.slice(0, list.albums.length))
		} else {
			listAlbumBoxes.push(classes.slice(0, 4))
			listBlackBoxes.push([])
		}
	});
	
	return (
		<>
		<UserInfo name={name} imageURL={imageURL} info={info} view="LISTS"/>
		{loading ?
		<LoadingSpinner />
		:
		<div class="listView">
				{wishlist.length !== 0 ?
				<NavLink to="/lists/wishlist" onClick={() => setCurrentList({"albums": wishlist, "name": "Listen Later"})} className="wishlist__individual">
					<div className="wishlist__image-stack">
						{albumBoxes.map((box, idx) => {return (
							<img className={"wishlist__image-stack-item wishlist__image-stack-item--" + box} src={wishlist[wishlist.length - (idx + 1)].images[1].url} alt=""/>
						)})}
						{blackBoxes.length > 0 ? blackBoxes.map(box => {return (
							<div className={"wishlist__blackbox wishlist__image-stack-item--" + box}></div>
						)}) : null}				
					</div>
					<div className="wishlist__infobox">
						<h4>Listen Later</h4>
						<p>{wishlist.length} {wishlist.length === 1 ? "album" : "albums"}</p>
					</div>
				</NavLink>
				:
				<div className="wishlist__infobox">
					<h4>Listen Later</h4>
					<p>{wishlist.length} {wishlist.length === 1 ? "album" : "albums"}</p>
				</div>
				}
			
			{lists.length !== 0 ? 
			<dl className="lists">
				{lists.map((list, idx) => {return (
					<NavLink to={`/lists/${list.name}`} onClick={() => setCurrentList(list)} className="lists__individual">
						<div className="lists__image-stack">
							{listAlbumBoxes[idx].map((box, jdx) => {return (
								<img className={"lists__image-stack-item lists__image-stack-item--" + box} src={list.albums[jdx].images[1].url} alt=""/>
							)})}
							{/* {listBlackBoxes[idx].length > 0 ? listBlackBoxes[idx].map(box => {return (
								<div className={"lists__blackbox lists__image-stack-item--" + box}></div>
							)}) : null} */}
						</div>
						<div className="lists__infobox">
							<dt>{list.name}</dt>
							<dd>{list.albums.length} {list.albums.length === 1 ? "album" : "albums"}</dd>
						</div>
					</NavLink>
				)})}
			</dl>
			:
			<dl className="lists">
				<dt className="lists__no-list">You have no lists yet!</dt>
			</dl>
			}
		</div>
		}
		</>
	);
}

export default ListView;