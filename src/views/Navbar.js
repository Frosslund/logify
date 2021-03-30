import { Link } from 'react-router-dom';
import Button from './components/Button';
import { handleLogin } from '../utils/handleLogin'

const Navbar = () => {
	return (
		<header>
			<Link to='/home'>
				<h1>Logify</h1>
			</Link>
			<Link to='/log'>
				<Button color='red' text='Log'/>
			</Link>
			<Button color='red' text='Lists'/>
			<Button color='red' text='Profile'/>
			<Button color='red' text='Login' type="submit" onClick={handleLogin} />
		</header>
	);
}

export default Navbar;