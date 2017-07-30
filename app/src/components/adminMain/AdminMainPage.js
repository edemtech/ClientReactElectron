import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadTable, getUser, removeUser } from '../../actions/adminActions';
import { addFlashMessage } from '../../actions/flashMessages';


class AdminMainPage extends React.Component{
	constructor(props) {
    super(props);
		this.state = {
      tableData: this.props.table.tableData.data,
			firstLoad: true
    }
		this.modifyRecord = this.modifyRecord.bind(this);
		this.deleteRecord = this.deleteRecord.bind(this);
		this.refreshRecords = this.refreshRecords.bind(this);
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
	modifyRecord(e) {
		let target = e.currentTarget.getAttribute('data-id');
		this.props.getUser(target).then(res => {
			this.context.router.push('update');
		});
	}
	deleteRecord(e) {
		let target = e.currentTarget.getAttribute('data-id');
		this.props.removeUser(target).then(res => {
			this.props.addFlashMessage({
				type: 'success',
				text: 'Пользователь ' + target + ' удален'
			})
			setTimeout( () => this.refreshRecords(), 500);
		})
	}

	render(){
		this.getRecords();
		return(
			<div>
				<div className="btn-group">
					<button className="btn btn-info" onClick={this.refreshRecords}>Обновить <span className="glyphicon glyphicon-refresh"></span></button>
					<Link to="/signup" className="btn btn-primary">Добавить пользователя <span className="glyphicon glyphicon-plus"></span></Link>
				</div>

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
									<td><div className="btn-group">
												<button data-id={item.username}
																className="btn btn-info"
																onClick={this.modifyRecord}>
																<span className="glyphicon glyphicon-pencil"></span>
																</button>
												<button data-id={item.username}
																className="btn btn-danger"
																onClick={this.deleteRecord}>
																<span className="glyphicon glyphicon-remove"></span>
																</button>
											</div>
									</td>
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

export default connect(mapStateToProps, { loadTable, getUser, removeUser, addFlashMessage })(AdminMainPage);
