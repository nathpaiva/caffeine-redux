import React from 'react';
import styled from 'styled-components';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 1.0rem auto auto;
  border: 1px solid rgb(90, 74, 105);
  border-radius: 2px;
  padding: 1.0rem;
  background-color: #fff;
`
const Box = ({ children, ...rest }) => (
  <Root {...rest}>
    {children}
  </Root>
);

export default Box;
