import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Button from './components/Button';
import { handleLogin } from '../utils/handleLogin';
import { fetchAlbum } from '../slices/albumSlice';
//import { fetchAlbum } from '';

/* const Navbar = () => {
	const dispatch = useDispatch();
	return (
		<header>
			<Link to='/home'>
				<h1>Logify</h1>
			</Link>
			<Link to='/log'>
				<Button color='red' text='Log'/>
			</Link>
			<Link to='album/0ETFjACtuP2ADo6LFhL6HN'>
				<Button color='red' text='Albumtest' onClick={dispatch(fetchAlbum('0ETFjACtuP2ADo6LFhL6HN'))} />
			</Link>
			<Button color='red' text='Lists'/>
			<Button color='red' text='Profile'/>
			<Button color='red' text='Login' type="submit" onClick={handleLogin} />
		</header>
	);
} */

const Navbar = ({ doSearch, clearSearch }) => {

	const [searchTerm, setSearchTerm] = useState("")

	const handleSearchInput = (term) => {
		setSearchTerm(term)
		term == "" ?
		clearSearch()
		:
		doSearch(term)
    };

    return (
		<header className="navbar">
			<NavLink to="/home" className="navbar__logo">
				Logify
			</NavLink>
			<div className="navbar__search__container">
				<input className="navbar__search__input"
					type="text"
					onChange={e => handleSearchInput(e.target.value)}
					placeholder="Search..."
					value={searchTerm}
				/>
			</div>
			<nav>
				<ul className="navbar__links">
					<li className="navbar__item">
						<NavLink to="/log" className="navbar__link">
							Log
						</NavLink>
					</li>
					<li className="navbar__item">
						<NavLink to="/lists" className="navbar__link">
							Lists
						</NavLink>
					</li>
					<li className="navbar__item">
						<NavLink to="#" className="navbar__link" onClick={handleLogin}>
							{localStorage.loggedIn ?
							<span>Logout</span> 
							:
							<span>Login</span>
							}
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
    );
};

export default Navbar;