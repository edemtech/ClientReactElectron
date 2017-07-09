import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../../actions/adminActions.js'

class AdminPage extends React.Component{
	constructor(props) {
    super(props);
		this.state = {
      tableData: []
    }
		this.getRecords = this.getRecords.bind(this);
  }

	getRecords() {
		getData().then(
			(res) => { this.setState({tableData: res.data.data}) },
			(err) => console.log('bad request'),
		);
	}

	render(){
		return(
			<div>
				<button className="btn btn-success" onClick={this.getRecords}>Click some</button>
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Username</th>
							<th>email</th>
							<th>permission</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.tableData.map( item =>
								<tr>
									<td>{item.username}</td>
									<td>{item.email}</td>
									<td>{item.permission}</td>
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
function someProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(someProps)(AdminPage);
