import React from 'react';
import styled from 'styled-components';

const Root = styled.input`
  border: 1px solid #CCCCCC;
  padding: 0 5px;
  margin: 2px 0;
  width: 100%;
  border-radius: 2px;
  height: 32px;

  &:disabled {
    opacity: .5;
  }
`;

const Input = ({ type, id, placeholder, disabled, inputRef }) => {
  return (
    <Root
      ref={inputRef}
      disabled={disabled}
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
    />
  );
};

export default Input;
