import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Router from './Router';

import '../App.scss';


const App = () => {
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
