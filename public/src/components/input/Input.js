import React from 'react';

const style = {
  styleInputDisabled: {
    border: '1px solid #CCCCCC',
    padding: '0 5px',
    margin: '2px 0',
    width: '100%',
    height: '32px',
    opacity: '.5'
  },
  styleInput: {
    border: '1px solid #CCCCCC',
    padding: '0 5px',
    margin: '2px 0',
    width: '100%',
    borderRadius: '2px',
    height: '32px',
  },
  styleLabel: {
    fontSice: '12px',
    fontFamily: '"Roboto", sans-serif'
  }
}

const Input = ({ type, id, text, value, label, disabled, inputRef, defaultValue }) => {
  return (
    <div>
      {label ? <label style={style.styleLabel} htmlFor={id}>{label}</label> : ''}
      <input ref={inputRef}
        style={!disabled ? style.styleInput : style.styleInputDisabled}
        defaultValue={defaultValue ? defaultValue : ''}
        disabled={disabled ? disabled : false}
        type={type}
        id={id} name={id} placeholder={text} />
    </div>
  )
};

export default Input;
