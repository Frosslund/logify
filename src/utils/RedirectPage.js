import _ from 'lodash';

import { getParamValues } from './getParamValues';
import { HandleUser } from './handleUser';

const RedirectPage = ({ history, location }) => {

	try {
		if (_.isEmpty(location.hash)) {
			history.push('/')
			return (null);
		}
		const access_token = getParamValues(location.hash);
		const expiryTime = new Date().getTime() + (access_token.expires_in * 1000);
		localStorage.setItem('params', JSON.stringify(access_token));
		localStorage.setItem('expiry_time', expiryTime);
		localStorage.setItem('loggedIn', true);
		history.push('/home');
		HandleUser();
	} catch (error) {
		history.push('/');
	}
  	return (null);
};

export default RedirectPage;
