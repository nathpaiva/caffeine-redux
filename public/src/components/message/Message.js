import React from 'react';

const style = {
  error: {
    backgroundColor: '#982d2d',
    padding: '15px 0',
    textAlign: 'center',
    fontSize: '15px',
    color: '#fff',
    fontFamily: '"Roboto", sans-serif',
  },
  success: {
    backgroundColor: '#469a46',
    padding: '15px 0',
    textAlign: 'center',
    fontSize: '15px',
    color: '#fff',
    fontFamily: '"Roboto", sans-serif',
  }
}

const Input = ({ className, msg }) => {
  return (
    <div style={style[className]}>
      {msg}
    </div>
  )
};

export default Input;
