import React from 'react';
import classnames from 'classnames';

//замена дубликации полей ввода в форме
const TextFieldGroupB = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <input
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        placeholder={label}
        className="form-control input-sm input-x"
      />
    {error && <span className="help-block">{error}</span>}
    </div>

  );
}

TextFieldGroupB.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
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
