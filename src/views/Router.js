import { Route, Switch, Redirect } from 'react-router-dom';

import HomeView from './HomeView';
import RedirectPage from './RedirectPage';
import LogView from './LogView';


const Router = () => {
	return ( // views to switch between in the main body of the page
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route exact path="/home" component={HomeView} />
			<Route exact path="/redirect" component={RedirectPage} />
			<Route exact path="/log" component={LogView} />

		</Switch>

			
	)
}

export default Router;