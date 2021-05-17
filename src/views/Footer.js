import { useEffect, useState } from 'react';
 
const Footer = () => {

	const [offset, setOffset] = useState(0);

	useEffect(() => {
		window.onscroll = () => {
		setOffset(window.pageYOffset)
		}
	}, []);

	console.log(offset);
	

    return (
		<header className={`navbar footer footer${offset !== 0 ? "__hidden" : "__visible"}`}>
				<span><i class="far fa-copyright"></i> Valen & Lulle</span>			
		</header>
    );
};

export default Footer;