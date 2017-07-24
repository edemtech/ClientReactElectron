import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getUser, loadTable } from '../../actions/adminActions';


class AdminMainPage extends React.Component{
	constructor(props) {
    super(props);
		this.state = {
      tableData: []
    }
		this.modifyRecord = this.modifyRecord.bind(this);
		this.getRecords = this.getRecords.bind(this);
  }
	getRecords() {
		console.log('summon table');
		this.props.loadTable();
		this.setState({ tableData: this.props.table.tableData.data})
	}
	modifyRecord(e) {
		let target = e.currentTarget.getAttribute('data-id');
		console.log('target', target);
		this.props.getUser(target);
	}

	render(){
		return(
			<div>
				<button className="btn btn-danger" onClick={this.getRecords}>LOAD</button>
				<table className="table table-sm table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Логин</th>
							<th>email</th>
							<th>Права</th>
							<th>Опции</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.tableData.map( item =>
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.username}</td>
									<td>{item.email}</td>
									<td>{item.permission}</td>
									<td><button data-id={item.username}
															className="btn btn-success"
															onClick={this.modifyRecord}>
															<span className="glyphicon glyphicon-pencil"></span>
															</button></td>
								</tr>
							)
						}
					</tbody>
				</table>
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

export default connect(mapStateToProps, { loadTable, getUser })(AdminMainPage);
