import React from 'react';
import styled from 'styled-components';

const Root = styled.label`
  font-size: 1.2rem;
  font-family: Roboto, sans-serif;
`;

const Label = ({ children, ...rest }) => {
  return (
    <Root {...rest}>
      {children}
    </Root>
  );
};

export default Label;
