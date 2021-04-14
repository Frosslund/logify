const LogView = (props) => {

	const {
		logs
	} = props;

	return (
		<div class="LogView">
			<table class="logTable">
				<thead>
					<tr>
						<th>Date</th>
						<th>Album</th>
						<th>Year</th>
						<th>Rating</th>
						<th>Re-listen</th>
					</tr>
				</thead>
				<tbody>
					{logs.map(log => {
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