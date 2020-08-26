'use strict';

import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import Input from './Input';

const fireChangeValue = (input, value) => {
  fireEvent.change(input, { target: { value } });
  expect(input).toHaveValue('ldlld');
};

describe('#Input', () => {
  test('#should render an Input email', () => {
    render(<Input type="email" id="email" placeholder="email" />);

    const email = screen.getByPlaceholderText('email');
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('type', 'email');
  });

  test('#should render an Input text', () => {
    render(<Input type="text" id="text" placeholder="text" />);

    const text = screen.getByPlaceholderText('text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveAttribute('type', 'text');
  });

  test('#should render an Input disabled', () => {
    const {debug} = render(<Input type="text" id="text" disabled placeholder="text" />);

    const text = screen.getByPlaceholderText('text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveAttribute('disabled', '');
    fireChangeValue(text, 'value');
    debug();
  });
});
