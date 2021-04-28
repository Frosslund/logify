import UserInfo from "./components/UserInfo";

const ListView = (props) => {

	const {
		wishlist,
		name,
		imageURL
	} = props;
	
	const numOfLists = 3
	const info = `Lists: ${numOfLists} | Albums in wish list: ${wishlist.length}`
	
	return (
		<div class="logView">
			<UserInfo name={name} imageURL={imageURL} info={info}/>
            <h3>Wish list:</h3>
			<table class="logTable">
				<thead>
					<tr class="firstRow">
						<th>Date</th>
						<th>Album</th>
						<th>Year</th>
					</tr>
				</thead>
				<tbody>
					{wishlist.slice(0).reverse().map(wish => {
						return (
							<tr>
								<td>{wish.dateAdded}</td>
								<td>{wish.album.name}</td>
								<td>{wish.album.released}</td>
							</tr>
						)}
					)}
				</tbody>
			</table>
		</div>
	);
}

export default ListView;