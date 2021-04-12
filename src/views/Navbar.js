import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './components/Button';
import { handleLogin } from '../utils/handleLogin';
import { fetchAlbum } from '../slices/albumSlice';
//import { fetchAlbum } from '';

const Navbar = () => {
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
}

export default Navbar;