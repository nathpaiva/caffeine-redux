import React from 'react';

const subTitleCenter = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#414141',
  fontFamily: '"Roboto", sans-serif'
}

const Title = ({ title }) => (
  <h2 style={subTitleCenter}>{title}</h2>
);

export default Title;
