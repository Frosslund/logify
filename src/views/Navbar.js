import Button from './components/Button';

const Navbar = () => {
    return (
        <header>
            <h1>Logify</h1>
            <Button color='red' text='Log'/>
            <Button color='red' text='Lists'/>
            <Button color='red' text='Profile'/>
        </header>
    );
}

export default Navbar;