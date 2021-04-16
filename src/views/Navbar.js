import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { handleLogin, handleLogout } from '../utils/handleLogin';

const Navbar = ({ doSearch, clearSearch, loggedInUser, logOutUser }) => {

	const [searchTerm, setSearchTerm] = useState("")

	const handleSearchInput = (term) => {
		setSearchTerm(term)
		term === "" ?
		clearSearch()
		:
		doSearch(term)
    };

	const handleUserLogout = () => {
		logOutUser();
		handleLogout();
	}

    return (
		<header className="navbar">
			<NavLink to="/home" className="navbar__logo">
				<span>Logify &#9998;</span>
			</NavLink>
			<div className="navbar__search__container">
				<NavLink to="/home">
				<input className="navbar__search__input"
					type="text"
					onChange={e => handleSearchInput(e.target.value)}
					placeholder="Search..."
					value={searchTerm}
				/>
				</NavLink>
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
						<NavLink to={localStorage.loggedIn || loggedInUser ? "/home" : "#"} className="navbar__link" onClick={localStorage.loggedIn || loggedInUser ? handleUserLogout : handleLogin}>
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