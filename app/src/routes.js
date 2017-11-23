import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import WorkEnvPage from './components/workenv/workenvPage';
import AdminMainPage from './components/adminMain/AdminMainPage';
import EditUserPage from './components/editUser/EditUserPage';

import requireAuth from './utils/requireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={requireAuth(Greetings)} />
		<Route path="signup" component={requireAuth(SignupPage)} />
		<Route path="login" component={LoginPage} />
		<Route path="admin" component={requireAuth(AdminMainPage)} />
		<Route path="update" component={requireAuth(EditUserPage)} />
		<Route path="workenv" component={requireAuth(WorkEnvPage)} />
	</Route>
)
