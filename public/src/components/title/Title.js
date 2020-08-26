import React from 'react';
import styled from 'styled-components';

const Root = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #414141;
  font-family: Roboto, sans-serif;
`;

const Title = ({ children, ...rest }) => (
  <Root {...rest}>{children}</Root>
);

export default Title;
