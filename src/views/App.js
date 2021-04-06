import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Router from './Router';

import '../App.scss';
import { HandleUser } from '../utils/handleUser';

const App = () => {
	if (!(localStorage.length === 0)) HandleUser();
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Router />
			</div>
		</BrowserRouter>
	);
}

export default App;
