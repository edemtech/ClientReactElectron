import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';


class Greetings extends React.Component{
	componentDidMount() {
		const { isAuthenticated } = this.props.auth;
		( isAuthenticated !== true ) && this.context.router.push('/login');
	}
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

// function someProps(state) {
//   return {
//     auth: state.auth
//   };
// }
Greetings.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect( state => { return { auth: state.auth } }, { logout })(Greetings);
