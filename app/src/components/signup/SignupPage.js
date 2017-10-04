import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component{
	render() {
		const { userSignupRequest, addFlashMessage } = this.props;
		return(
			<div className="">
				<h3><Link to="/admin" className="btn btn-danger"><span className="glyphicon glyphicon-chevron-left"></span></Link> Регистрация пользователя</h3>
				<SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage} />
			</div>
		);
	}
}

SignupPage.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest, addFlashMessage })(SignupPage);
