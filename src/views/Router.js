import { Route, Switch, Redirect } from 'react-router-dom';

import RedirectPage from '../utils/RedirectPage';

import AlbumPresenter from '../presenters/AlbumPresenter';
import ResultsPresenter from '../presenters/ResultsPresenter';
import LogPresenter from '../presenters/LogPresenter';
import ListPresenter from '../presenters/ListPresenter';
import SingleListPresenter from '../presenters/SingleListPresenter';




const Router = () => {
	return ( // views to switch between in the main body of the page
		<Switch>
			<Redirect exact from="/" to="/home" />
			<Route exact path="/home" component={ResultsPresenter} />
			<Route exact path="/redirect" component={RedirectPage} />
			<Route exact path="/log" component={LogPresenter} />
			<Route exact path="/lists" component={ListPresenter} />
			<Route path="/album/:id" component={AlbumPresenter} />
			<Route path="/lists/:name" component={SingleListPresenter} />
		</Switch>

			
	)
}

export default Router;