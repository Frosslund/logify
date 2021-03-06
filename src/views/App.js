import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import '../App.scss';
import { handleLogout } from '../utils/handleLogin';
import { HandleUser } from '../utils/handleUser';
import NavbarPresenter from '../presenters/NavbarPresenter';
import FooterPresenter from '../presenters/FooterPresenter';

const App = () => {
	if ((localStorage.expiry_time <= Date.now())) handleLogout();
	if ((localStorage.loggedIn)) HandleUser();
	return (
		<BrowserRouter>
			<div className="App">
				<NavbarPresenter />
				<Router />
				<FooterPresenter />
			</div>
		</BrowserRouter>
	);
}

export default App;
