import React from 'react';
import EditUserForm from './EditUserForm';
import { connect } from 'react-redux';
// import {  } from '../../actions/adminActions';
import { addFlashMessage } from '../../actions/flashMessages';

class EditUserPage extends React.Component{
	render() {
		const { addFlashMessage } = this.props;
		return(
			<div className="">
			<h3>Редактирование пользователя</h3>
					<EditUserForm addFlashMessage={addFlashMessage} edit={this.props.edit} />
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
		edit: state.edit,
  };
}
EditUserPage.propTypes = {
	// userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}
EditUserPage.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addFlashMessage })(EditUserPage);
