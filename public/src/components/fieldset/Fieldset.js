import React from 'react';
import styled from 'styled-components';

const Root = styled.fieldset`
  margin-bottom: 1.0rem;
`;

const Fieldset = ({ children, ...rest }) => (
  <Root {...rest}>{children}</Root>
);

export default Fieldset;
