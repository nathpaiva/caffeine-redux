import React from 'react';
import styled from 'styled-components';

const Root = styled.button`
  font-size: 1.2rem;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #5A4A69;
  color: #FFFFFF;
  font-weight: bold;
  width: 100%;
  border: none;
  border-radius: 2px;
`;

const Button = ({ children, ...rest }) => (
  <Root {...rest}>{children}</Root>
);

export default Button;
