import { useState } from 'react'; 

const ResultsView = ({albums, artists, topResult, doSearch, clearSearch}) => {

	const [searchTerm, setSearchTerm] = useState("")

	const handleSearchInput = (term) => {
		setSearchTerm(term)
		term == "" ?
		clearSearch()
		:
		doSearch(term)
    };

	const displayResults = (results) => {
		const items = results.map((result) =>
			<li key={result.id}>
				{result.name}
			</li>
		);
		return items;
	}

	return (
		<div>
			<h1>Results page</h1>
			<input
				type="text"
				className="navigation__input"
				onChange={e => handleSearchInput(e.target.value)}
				placeholder="Search..."
				value={searchTerm}
        	/>
			{artists.length == 0 ?
			<div>
				search search search
			</div>
			:
			<div>
				<h2>Top Result is: {topResult.name}</h2>
				<h3>Here are some albums: </h3>
				<ul>{displayResults(albums)}</ul>
				<h3>Here are some artists: </h3>
				<ul>{displayResults(artists)}</ul>		
			</div>
			}
		</div>
	);
}

export default ResultsView;