import { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { getParamValues } from './getParamValues';
import { fetchUser } from '../slices/userSlice';
import { HandleUser } from './handleUser';

const RedirectPage = ({ history, location }) => {

  //const dispatch = useDispatch();


	try {
		if (_.isEmpty(location.hash)) {
			return history.push('/dashboard');
		}
		const access_token = getParamValues(location.hash);
		const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
		localStorage.setItem('params', JSON.stringify(access_token));
		localStorage.setItem('expiry_time', expiryTime);
		localStorage.setItem('loggedIn', true);
		//dispatch(fetchUser())
		history.push('/home');
	} catch (error) {
		history.push('/');
	}
  	HandleUser();
  	return (null);
};

export default RedirectPage;
