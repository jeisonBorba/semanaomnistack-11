import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import NotFound from './pages/NotFound';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon} />
				<Route path="/register" component={Register} />
				<PrivateRoute path="/profile" component={Profile} />
				<PrivateRoute path="/incidents/new" component={NewIncident} />
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>	
	)
};

export default Routes;