import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadTable, getUser, removeUser } from '../../actions/adminActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { userSignupRequest } from '../../actions/signupActions';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import AdminOptions from './AdminOptions';
import FormDb from './FormDb';


class AdminMainPage extends React.Component{
	constructor(props) {
    super(props);
		this.state = {
      tableData: this.props.table.tableData.data,
			firstLoad: true
    }
		this.refreshRecords = this.refreshRecords.bind(this);
		this.options = {
      defaultSortOrder: 'desc',
    };
  }
	refreshRecords() {
		this.props.loadTable().then( res => {
			this.props.addFlashMessage({
				type: 'success',
				text: 'Таблица обновлена'
			})
			this.setState({ tableData: this.props.table.tableData.data})
		});
	}
	getRecords() {
		if( this.state.firstLoad ) {
			this.props.loadTable().then( res => {
				this.setState({ tableData: this.props.table.tableData.data, firstLoad: false})
			});
		};
	}
	actions(cell, row){
	  return (
			<AdminOptions id={row.username} getUser={getUser} removeUser={removeUser}/>
		);
	}
	render(){
		let table = this.state.tableData;
		this.getRecords();
		return(
			<div>
				<div className="btn-group">
					<button className="btn btn-info" onClick={this.refreshRecords}>Обновить <span className="glyphicon glyphicon-refresh"></span></button>
					<Link to="/signup" className="btn btn-primary">Добавить пользователя <span className="glyphicon glyphicon-plus"></span></Link>
					<FormDb userSignupRequest={this.props.userSignupRequest} addFlashMessage={this.props.addFlashMessage}/>
				</div>

				<BootstrapTable
					data={table}
					search={true}
					searchPlaceholder='Поиск'
					multiColumnSearch={true}
					options={this.options}
					pagination
					condensed
					striped
					hover
					bordered={false}>
						<TableHeaderColumn isKey dataField="id" dataSort width='50'>ID</TableHeaderColumn>
						<TableHeaderColumn dataField="username" dataSort width='150'>Username</TableHeaderColumn>
						<TableHeaderColumn dataField="email" dataSort>Email</TableHeaderColumn>
						<TableHeaderColumn dataField="id" dataFormat={this.actions}>Action</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
		table: state.table,
		edit: state.edit,
  };
}
AdminMainPage.contextTypes = {
	router: React.PropTypes.object.isRequired
}
AdminMainPage.propTypes = {
	getUser: React.PropTypes.func.isRequired,
	removeUser: React.PropTypes.func.isRequired,
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}
export default connect(mapStateToProps, { loadTable, getUser, removeUser, addFlashMessage, userSignupRequest })(AdminMainPage);
