import Button from './Button';

const Header = () => {
    return (
        <header>
            <h1>Logify</h1>
            <Button color='red' text='Log'/>
            <Button color='red' text='Lists'/>
            <Button color='red' text='Profile'/>
        </header>
    );
}

export default Header;