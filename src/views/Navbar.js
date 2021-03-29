import Button from './components/Button';
import { handleLogin } from '../utils/handleLogin'

const Navbar = () => {
	return (
		<header>
			<h1>Logify</h1>
			<Button color='red' text='Log'/>
			<Button color='red' text='Lists'/>
			<Button color='red' text='Profile'/>
			<Button color='red' text='Login' type="submit" onClick={handleLogin} />
		</header>
	);
}

export default Navbar;