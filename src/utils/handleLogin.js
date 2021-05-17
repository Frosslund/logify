export const handleLogin = () => {
	
	const {
		REACT_APP_CLIENT_ID,
		REACT_APP_AUTHORIZE_URL,
		REACT_APP_REDIRECT_URL
	} = process.env;

	return (
		window.location =
			`${REACT_APP_AUTHORIZE_URL}?
			client_id=${REACT_APP_CLIENT_ID}&
			scope=playlist-modify-public&
			redirect_uri=${REACT_APP_REDIRECT_URL}&
			response_type=token&show_dialog=true`
	);
}

export const handleLogout = () => {
	localStorage.clear();
}
