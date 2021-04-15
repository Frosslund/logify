const LogView = (props) => {

	const {
		logs
	} = props;
	
	return (
		<div class="logView">
			<table class="logTable">
				<thead>
					<tr class="firstRow">
						<th>Date</th>
						<th>Album</th>
						<th>Year</th>
						<th>Rating</th>
						<th>Re-listen</th>
					</tr>
				</thead>
				<tbody>
					{logs.slice(0).reverse().map(log => {
						return (
							<tr>
								<td>{log.dateAdded}</td>
								<td>{log.album.name}</td>
								<td>{log.album.released}</td>
								<td>{log.rating}</td>
								<td>{log.firstListen === true ? "1st" : "Relisten"}</td>
							</tr>
						)}
					)}
				</tbody>
			</table>
		</div>
	);
}

export default LogView;