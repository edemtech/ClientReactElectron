import React from 'react';
import permissions from '../../data/permissions.js';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import TextFieldGroupB from '../common/TextFieldGroupB';


import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
function validateInput(data) {
	let errors = {};

	if (validator.isEmpty(data.username)) {
		errors.username = 'Заполните поле';
	}
	if (validator.isEmpty(data.email)) {
		errors.email = 'Заполните поле';
	} else if (!validator.isEmail(data.email)){
		errors.email = 'Неправильный формат почты';
	}
	if (validator.isEmpty(data.password)) {
		errors.password = 'Заполните поле';
	}
	if (validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Заполните поле';
	}
	if (!validator.equals(data.password, data.passwordConfirmation)){
		errors.passwordConfirmation = 'Пароли должны совпадать';
	}
	if (validator.isEmpty(data.permission)) {
		errors.permission = 'Заполните поле';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}



class EditUserForm extends React.Component{
	//конкструктор свойств
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.edit.editingUser.username,
			email: this.props.edit.editingUser.email,
			password: '',
			passwordConfirmation: '',
			permission: this.props.edit.editingUser.permission,

			camcon: this.props.edit.editingUser.camcon,
			camconPass: this.props.edit.editingUser.camconPass,
			streamate: this.props.edit.editingUser.streamate,
			streamatePass: this.props.edit.editingUser.streamatePass,
			streamray: this.props.edit.editingUser.streamray,
			streamrayPass: this.props.edit.editingUser.streamrayPass,
			imlive: this.props.edit.editingUser.imlive,
			imlivePass: this.props.edit.editingUser.imlivePass,
			mfc: this.props.edit.editingUser.mfc,
			mfcPass: this.props.edit.editingUser.mfcPass,
			f4f: this.props.edit.editingUser.f4f,
			f4fPass: this.props.edit.editingUser.f4fPass,
			jasmin: this.props.edit.editingUser.jasmin,
			jasminPass: this.props.edit.editingUser.jasminPass,

			errors: {},
			isLoading: false,
			options: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	//при изменении
	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	//проверка на правильность и ссылка на функцию валидации
	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if (!isValid){
			this.setState({ errors });
		}

		return isValid;
	}

	//при нажатии кнопки submit
	onSubmit(e) {
		e.preventDefault();

		if (this.isValid()){   							     //проверка локальной валидации
			this.setState({ errors: {}, isLoading: true });  //
			this.props.userSignupRequest(this.state).then(   //проверка валидации на сервере, если данные не заполнены или не верны, возвращаются сообщения
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Регистрация прошла успешно'
					})
					this.context.router.push('/'); 			 //при успешной валидации происходит редирект на главную
				},
				({ response }) => this.setState({ errors: response.data, isLoading: false })
			);
		}
	}

	//личико
	render(){
		const { errors } = this.state;
		const options = map(permissions, (val, key) =>
			<option key={val} value={val}>{key}</option>
		);
		console.log(this.props);
		return(
			<form onSubmit={this.onSubmit} className="form-group">


					<div className="col-md-4">
						<TextFieldGroup error={errors.username} label="Имя пользователя" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.username} field="username"/>
				    	<TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.email} field="email"/>
				    	<TextFieldGroup error={errors.password} label="Пароль" onChange={this.onChange} value={this.state.password} field="password" type="password"/>
				    	<TextFieldGroup error={errors.passwordConfirmation} label="Подтвердите пароль" onChange={this.onChange} value={this.state.passwordConfirmation} field="passwordConfirmation" type="password"/>

			      		<div className={classnames("form-group", { 'has-error': errors.permission })}>
							<label className="control-label">Права пользователя</label>
							<select
								className="form-control"
								name="permission"
								onChange={this.onChange}
								value={this.state.permission}>
								<option value="" disabled>Выберите права</option>
								{options}
							</select>
							{errors.permission && <span className="help-block">{errors.permission}</span>}
						</div>
						<div className="form-group btn-group">
							<button disabled={this.state.isLoading} className="btn btn-success btn-lg">
								Изменить запись <span className="glyphicon glyphicon-ok"></span>
							</button>
							<button disabled={this.state.isLoading} className="btn btn-danger btn-lg">
								Удалить <span className="glyphicon glyphicon-remove"></span>
							</button>
						</div>
					</div>

					<div className={this.state.permission==='user' ? '' : 'hidden'}>
						<div className="col-md-4">
							<div className="panel panel-default">
								<div className="panel-heading">Cam contacts</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="Cam contacts login" onChange={this.onChange} value={this.state.camcon} field="camcon" type="text" />
						    	<TextFieldGroupB label="Cam contacts password" onChange={this.onChange} value={this.state.camconPass} field="camconPass" type="password" />
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">Streamate</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="Streamate login" onChange={this.onChange} value={this.state.streamate} field="streamate" type="text" />
							    <TextFieldGroupB label="Streamate password" onChange={this.onChange} value={this.state.streamatePass} field="streamatePass" type="password" />
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">Streamray</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="Streamray login" onChange={this.onChange} value={this.state.streamray} field="streamray" type="text" />
							    <TextFieldGroupB label="Streamray password" onChange={this.onChange} value={this.state.streamrayPass} field="streamrayPass" type="password" />
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">imlive</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="Imlive login" onChange={this.onChange} value={this.state.imlive} field="imlive" type="text" />
							    <TextFieldGroupB label="Imlive password" onChange={this.onChange} value={this.state.imlivePass} field="imlivePass" type="password" />
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="panel panel-default">
								<div className="panel-heading">MFC</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="MFC login" onChange={this.onChange} value={this.state.mfc} field="mfc" type="text" />
							    <TextFieldGroupB label="MFC password" onChange={this.onChange} value={this.state.mfcPass} field="mfcPass" type="password" />
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">F4F</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="F4F login" onChange={this.onChange} value={this.state.f4f} field="f4f" type="text" />
							    <TextFieldGroupB label="F4F password" onChange={this.onChange} value={this.state.f4fPass} field="f4fPass" type="password" />
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">Jasmin</div>
								<div className="panel-body-x">
									<TextFieldGroupB label="Jasmin login" onChange={this.onChange} value={this.state.jasmin} field="jasmin" type="text" />
							    <TextFieldGroupB label="Jasmin password" onChange={this.onChange} value={this.state.jasminPass} field="jasminPass" type="password" />
								</div>
							</div>
						</div>
					</div>

			</form>
		);
	};
}

EditUserForm.propTypes = {
	// userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

EditUserForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default EditUserForm;
