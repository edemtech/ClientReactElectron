import React from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, loadTable } from '../../actions/adminActions';
import { addFlashMessage } from '../../actions/flashMessages';


class AdminOptions extends React.Component {
	constructor(props) {
    super(props);
		this.modifyRecord = this.modifyRecord.bind(this);
		this.deleteRecord = this.deleteRecord.bind(this);
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
  refreshRecords() {
		this.props.loadTable().then( res => {
			this.props.addFlashMessage({
				type: 'success',
				text: 'Таблица обновлена'
			})
			//отправить коллбэк
			// AdminMainPage.setState({ tableData: this.props.table.tableData.data})
		});
	}
  render() {
    return (
			<div className="btn-group">
				<button data-id={this.props.id}
								className="btn btn-info"
								onClick={this.modifyRecord}>
								<span className="glyphicon glyphicon-pencil"></span>
								</button>
				{/*<button data-id={this.props.id}
								className="btn btn-danger"
								onClick={this.deleteRecord}>
								<span className="glyphicon glyphicon-remove"></span>
								</button>*/}
			</div>
    );
  }
}

AdminOptions.propTypes = {
	getUser: React.PropTypes.func.isRequired,
	removeUser: React.PropTypes.func.isRequired,
  loadTable: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

AdminOptions.contextTypes = {
	router: React.PropTypes.object.isRequired
}
export default connect(null, {getUser, removeUser, addFlashMessage, loadTable})(AdminOptions);
