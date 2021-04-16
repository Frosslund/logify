import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

import '../App.scss';
import { HandleUser } from '../utils/handleUser';
import NavbarPresenter from '../presenters/NavbarPresenter';

const App = () => {
	if ((localStorage.loggedIn)) HandleUser();
	return (
		<BrowserRouter>
			<div className="App">
				<NavbarPresenter />
				<Router />
			</div>
		</BrowserRouter>
	);
}

export default App;
