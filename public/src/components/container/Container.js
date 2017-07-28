import React from 'react';

const container = {
  margin: '5px 0',
  fontSize: '12px'
}

const Container = ({ children }) => (
  <li style={container}>
    {children}
  </li>
);

export default Container;
