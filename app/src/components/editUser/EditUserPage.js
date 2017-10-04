import React from 'react';
import EditUserForm from './EditUserForm';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveUser, removeUser } from '../../actions/adminActions';
import { addFlashMessage } from '../../actions/flashMessages';

class EditUserPage extends React.Component{
	render() {
		const { saveUser, removeUser, addFlashMessage } = this.props;
		return(
			<div className="">
				<h3><Link to="/admin" className="btn btn-danger"><span className="glyphicon glyphicon-chevron-left"></span></Link> Редактирование пользователя</h3>
				<EditUserForm saveUser={saveUser} removeUser={removeUser} addFlashMessage={addFlashMessage} edit={this.props.edit} />
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
	saveUser: React.PropTypes.func.isRequired,
	removeUser: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}
EditUserPage.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, { saveUser, removeUser, addFlashMessage })(EditUserPage);
