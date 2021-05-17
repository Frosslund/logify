import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { handleLogin, handleLogout } from '../utils/handleLogin';

const Navbar = ({ doSearch, clearSearch, userId, logOutUser }) => {

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
		window.location.reload();
	}

    return (
		<header className="navbar">
			<NavLink to="/home" onClick={() => {clearSearch(); setSearchTerm("")}} className="navbar__logo">
				<span>Logify <i className="fas fa-pencil-alt"></i></span>
			</NavLink>
			{userId !== "" ?
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
			:
			null
			}
			<nav>
				<ul className="navbar__links">
					<li className="navbar__item">
						{userId !== "" ?
						<NavLink to="/log" className="navbar__link">
							Log
						</NavLink>
						:
						<span className="navbar__link"></span>
						}
					</li>
					<li className="navbar__item">
						{userId !== "" ?
						<NavLink to="/lists" className="navbar__link">
							Lists
						</NavLink>
						:
						<span className="navbar__link"></span>
						}
					</li>
					<li className="navbar__item">
						<NavLink to={userId !== "" ? "/" : "#"} className="navbar__link" onClick={userId !== "" ? handleUserLogout : handleLogin}>
							{userId !== "" ?
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