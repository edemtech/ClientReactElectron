import React from 'react';
import classnames from 'classnames';

//замена дубликации полей ввода в форме
const TextFieldGroupB = ({ field, valueLogin, valuePass, label, error, onChange, checkUserExists }) => {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{label}</div>
      <div className="panel-body-x">
        <div className={classnames('form-group', { 'has-error': error })}>
          <input
            onChange={onChange}
            onBlur={checkUserExists}
            value={valueLogin}
            type='text'
            name={field}
            placeholder={label+' login'}
            className="form-control input-sm input-x"
          />
          <input
            onChange={onChange}
            onBlur={checkUserExists}
            value={valuePass}
            type='password'
            name={field+'Pass'}
            placeholder={label+' password'}
            className="form-control input-sm input-x"
          />
        {error && <span className="help-block">{error}</span>}
        </div>
      </div>
    </div>
  );
}

TextFieldGroupB.propTypes = {
  field: React.PropTypes.string.isRequired,
  valueLogin: React.PropTypes.string.isRequired,
  valuePass: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
  //checkUserExists: React.PropTypes.func
}

TextFieldGroupB.defaultProps = { //свойство по умолчанию
  type: 'text'
}

export default TextFieldGroupB;
