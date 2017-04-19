import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import WorkEnvPage from './components/workenv/workenvPage';
import AdminPage from './components/admin/AdminPage';

import requireAuth from './utils/requireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Greetings} />
		<Route path="signup" component={requireAuth(SignupPage)} />
		<Route path="login" component={LoginPage} />
		<Route path="admin" component={requireAuth(AdminPage)} />
		<Route path="workenv" component={requireAuth(WorkEnvPage)} />
	</Route>
)
