import { Route, Switch, Redirect } from 'react-router-dom';

import HomeView from './HomeView';
import RedirectPage from '../utils/RedirectPage';
import LogView from './LogView';

import AlbumPresenter from '../presenters/AlbumPresenter';
import LogPresenter from '../presenters/LogPresenter';



const Router = () => {
	return ( // views to switch between in the main body of the page
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route exact path="/home" component={HomeView} />
			<Route exact path="/redirect" component={RedirectPage} />
			<Route exact path="/log" component={LogPresenter} />
			<Route path="/album/:id" component={AlbumPresenter} />
		</Switch>

			
	)
}

export default Router;