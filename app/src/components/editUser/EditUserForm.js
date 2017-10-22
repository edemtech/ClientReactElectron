import React from 'react';
import permissions from '../../data/permissions.js';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import TextFieldGroupB from '../common/TextFieldGroupB';

import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

class EditUserForm extends React.Component {
  //конкструктор свойств
  constructor(props) {
    super(props);
    this.state = {
      //account settings
      username: this.props.edit.editingUser.username,
      email: this.props.edit.editingUser.email,
      permission: this.props.edit.editingUser.permission,
      //password
      password: '',
      passwordConfirmation: '',
      passwordLocked: true,
      //webcam accounts
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
      //other
      errors: {},
      isLoading: false,
      options: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSavePassword = this.onSavePassword.bind(this);
    this.unlockPassword = this.unlockPassword.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }
  //проверка на правильность и ссылка на функцию валидации
  isValid() {
    const {errors, isValid} = this.validateInput(this.state);
    if (!isValid) {
      this.setState({errors});
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
    } else if (!validator.isEmail(data.email)) {
      errors.email = 'Неправильный формат почты';
    }
    if (!this.state.passwordLocked) {
      if (validator.isEmpty(data.password)) {
        errors.password = 'Заполните поле';
      }
      if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Пароли должны совпадать';
      }
    }
    if (validator.isEmpty(data.permission)) {
      errors.permission = 'Заполните поле';
    }
    return {errors, isValid: isEmpty(errors)}
  }
  //при изменении
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSave(e) {
    e.preventDefault();
    if (this.isValid()) {
      let data = {
        username: this.state.username,
        email: this.state.email,
        permission: this.state.permission,
        password: this.state.password,
        camcon: this.state.camcon,
        camconPass: this.state.camconPass,
        streamate: this.state.streamate,
        streamatePass: this.state.streamatePass,
        streamray: this.state.streamray,
        streamrayPass: this.state.streamrayPass,
        imlive: this.state.imlive,
        imlivePass: this.state.imlivePass,
        mfc: this.state.mfc,
        mfcPass: this.state.mfcPass,
        f4f: this.state.f4f,
        f4fPass: this.state.f4fPass,
        jasmin: this.state.jasmin,
        jasminPass: this.state.jasminPass
      };
      this.props.saveUser(this.props.edit.editingUser.username, data).then(() => {
        this.props.addFlashMessage({type: 'success', text: 'Пользователь изменен'})
        this.context.router.push('/admin');
      });
    }
  }
  onSavePassword(e) {
    e.preventDefault();
    if (this.isValid()) {
      let data = {
        password: this.state.password
      };
      console.log(data);
      this.props.saveUser(this.props.edit.editingUser.username, data).then(() => {
        this.props.addFlashMessage({type: 'success', text: 'Пароль изменен'});
        this.setState({errors: {}, passwordLocked: true});
      });
    }
  }
  onDelete(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.removeUser(this.state.username).then(() => {
        this.props.addFlashMessage({type: 'success', text: 'Пользователь удален'})
        this.context.router.push('/admin');
      });
    }
  }
  unlockPassword(e) {
    e.preventDefault();
    this.state.passwordLocked === false
      ? this.setState({passwordLocked: true})
      : this.setState({passwordLocked: false});
  }
  generatePassword(e) {
    e.preventDefault();
    let length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    this.setState({password: retVal, passwordConfirmation: retVal});
  }

  //личико
  render() {
    const {errors} = this.state;
    const options = map(permissions, (val, key) => <option key={val} value={val}>{key}</option>
    );
    // console.log(this.state);
    const passField = (
      <div>
        <TextFieldGroup error={errors.password} label="Пароль" onChange={this.onChange} value={this.state.password} field="password" type="text"/>
        <TextFieldGroup error={errors.passwordConfirmation} label="Подтвердите пароль" onChange={this.onChange} value={this.state.passwordConfirmation} field="passwordConfirmation" type="text"/>
        <div className="form-group btn-group">
          <button onClick={this.onSavePassword} disabled={this.state.isLoading} className="btn btn-primary">
            Сохранить
            <span className="glyphicon glyphicon-ok"></span>
          </button>
          <button onClick={this.generatePassword} disabled={this.state.isLoading} className="btn btn-warning">
            Cгенерировать пароль
          </button>
          <button onClick={this.unlockPassword} disabled={this.state.isLoading} className="btn btn-danger">
            Отмена
            <span className="glyphicon glyphicon-cancel"></span>
          </button>
        </div>
      </div>
    );

    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <div className="col-md-4">
          <TextFieldGroup error={errors.username} label="Имя пользователя" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.username} field="username"/>
          <TextFieldGroup error={errors.email} label="Email" onChange={this.onChange} checkUserExists={this.checkUserExists} value={this.state.email} field="email"/>

          <div className="panel panel-default">
            {this.state.passwordLocked
              ? (
                <button className="btn btn-warning" onClick={this.unlockPassword}>Изменить пароль
                  <span className="glyphicon glyphicon-lock"></span>
                </button>
              )
              : passField}
          </div>

          <div className={classnames("form-group", {'has-error': errors.permission})}>
            <label className="control-label">Права пользователя</label>
            <select className="form-control" name="permission" onChange={this.onChange} value={this.state.permission}>
              <option value="" disabled>Выберите права</option>
              {options}
            </select>
            {errors.permission && <span className="help-block">{errors.permission}</span>}
          </div>

          <div className="form-group btn-group">
            <button onClick={this.onSave} disabled={this.state.isLoading} className="btn btn-success">
              Изменить запись
              <span className="glyphicon glyphicon-ok-sign"></span>
            </button>
            <button onClick={this.onDelete} disabled={this.state.isLoading} className="btn btn-danger">
              Удалить
              <span className="glyphicon glyphicon-remove-sign"></span>
            </button>
          </div>
        </div>

        {/*web cam account fields*/}
        <div className={this.state.permission === 'user'
          ? ''
          : 'hidden'}>
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

EditUserForm.propTypes = {
  // userSignupRequest: React.PropTypes.func.isRequired,
  saveUser: React.PropTypes.func.isRequired,
  removeUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

EditUserForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default EditUserForm;
