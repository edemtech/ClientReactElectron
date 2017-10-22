import React from 'react';
import permissions from '../../data/permissions.js';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import TextFieldGroupB from '../common/TextFieldGroupB';
import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

class SignupForm extends React.Component{
	//конкструктор свойств
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			permission: '',

			camcon: '',
			camconPass: '',
			streamate: '',
			streamatePass: '',
			streamray: '',
			streamrayPass: '',
			imlive: '',
			imlivePass: '',
			mfc: '',
			mfcPass: '',
			f4f: '',
			f4fPass: '',
			jasmin: '',
			jasminPass: '',

			errors: {},
			isLoading: false,
			options: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.generatePassword = this.generatePassword.bind(this);
	}
	//при изменении
	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	//проверка на правильность и ссылка на функцию валидации
	isValid() {
		const { errors, isValid } = this.validateInput(this.state);

		if (!isValid){
			this.setState({ errors });
		}

		return isValid;
	}
	validateInput(data) {
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
	//при нажатии кнопки submit
	onSubmit(e) {
		e.preventDefault();

		if (this.isValid()){   							     //проверка локальной валидации
			this.setState({ errors: {}, isLoading: true });  //
			this.props.userSignupRequest(this.state).then(   //проверка валидации на сервере, если данные не заполнены или не верны, возвращаются сообщения
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'Пользователь успешно зарегистрирован'
					})
					this.context.router.push('/admin'); 			 //при успешной валидации происходит редирект на главную
				},
				({ response }) => this.setState({ errors: response.data, isLoading: false })
			);

		}
	}
	generatePassword(e) {
    e.preventDefault();
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    this.setState({
      password: retVal,
      passwordConfirmation: retVal
    });
  }

	//личико
	render(){
		const { errors } = this.state;
		const options = map(permissions, (val, key) =>
			<option key={val} value={val}>{key}</option>
		);

		return(
			<form onSubmit={this.onSubmit} className="form-group">

					<div className="col-md-4">
						<TextFieldGroup error={errors.username} label="Имя пользователя" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.username} field="username"/>
				    	<TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.email} field="email"/>
				    	<TextFieldGroup error={errors.password} label="Пароль" onChange={this.onChange} value={this.state.password} field="password" type="text"/>
				    	<TextFieldGroup error={errors.passwordConfirmation} label="Подтвердите пароль" onChange={this.onChange} value={this.state.passwordConfirmation} field="passwordConfirmation" type="text"/>

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
								<button disabled={this.state.isLoading} className="btn btn-success">
									Создать запись
								</button>
								<button onClick={this.generatePassword} disabled={this.state.isLoading} className="btn btn-warning">
									Сгенерировать пароль <span className="glyphicon glyphicon-lock"></span>
								</button>
							</div>
					</div>

					<div className={this.state.permission!=='user' && 'hidden'}>
						<div className="col-md-4">
							<TextFieldGroupB label="Cam contacts login" onChange={this.onChange} valueLogin={this.state.camcon} valuePass={this.state.camconPass} field="camcon" type="text" />
							<TextFieldGroupB label="Streamate login" onChange={this.onChange} valueLogin={this.state.streamate} valuePass={this.state.streamatePass} field="streamate" type="text" />
							<TextFieldGroupB label="Streamray login" onChange={this.onChange} valueLogin={this.state.streamray} valuePass={this.state.streamrayPass} field="streamray" type="text" />
							<TextFieldGroupB label="Imlive login" onChange={this.onChange} valueLogin={this.state.imlive} valuePass={this.state.imlivePass} field="imlive" type="text" />
						</div>
						<div className="col-md-4">
							<TextFieldGroupB label="MFC login" onChange={this.onChange} valueLogin={this.state.mfc} valuePass={this.state.mfcPass} field="mfc" type="text" />
							<TextFieldGroupB label="F4F login" onChange={this.onChange} valueLogin={this.state.f4f} valuePass={this.state.f4fPass} field="f4f" type="text" />
							<TextFieldGroupB label="Jasmin login" onChange={this.onChange} valueLogin={this.state.jasmin} valuePass={this.state.jasminPass} field="jasmin" type="text" />
						</div>
					</div>

			</form>
		);
	};
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default SignupForm;
