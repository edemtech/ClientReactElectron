import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../../actions/adminActions.js'

class AdminPage extends React.Component{
	constructor(props) {
    super(props);
		this.state = {
      tableData: []
    }
		// this.getRecords = this.getRecords.bind(this);
  }
	getRecords() {
		getData().then(
			(res) => { this.setState({tableData: res.data.data}) },
			(err) => console.log('bad request'),
		);
	}
	modifyRecord(e) {
		console.log(e.currentTarget);
	}

	render(){
		this.getRecords();
		return(
			<div>
				<table className="table table-sm table-bordered table-hover">
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
									<td><button data-id={item.username} className="btn btn-danger" onClick={this.modifyRecord}>Modify</button></td>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		);
	}
}

// export default AdminPage;
function stateProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(stateProps)(AdminPage);
