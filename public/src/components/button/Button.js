import React from 'react';

var buttonStyle = {
  fontSize: '12px',
  padding: '10px',
  textAlign: 'center',
  textTransform: 'uppercase',
  cursor: 'pointer',
  backgroundColor: '#5A4A69',
  color: '#FFFFFF',
  fontWeight: 'bold',
  width: '100%',
  border: 'none',
  borderRadius: '2px',
};


const Button = ({ name }) => (
  <button style={buttonStyle}>{name}</button>
);

export default Button;
