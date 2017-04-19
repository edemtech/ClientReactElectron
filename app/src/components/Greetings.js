import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';


class Greetings extends React.Component{
	render() {
		const u = this.props.auth.user;
		const { isAuthenticated } = this.props.auth;

		const userData = (
			<div><h1>Привет, { u.username }</h1></div>
		);
		const guestData = (
			<div><h1>Добро пожаловать!</h1></div>
		);

		return(
			<div className="jumbotron">
				{ isAuthenticated ? userData : guestData }
			</div>
		);
	}
}

function someProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(someProps, { logout })(Greetings);
