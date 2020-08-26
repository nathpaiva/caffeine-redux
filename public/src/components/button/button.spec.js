'use strict';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('#Button', () => {
  test('#should render a button without text', () => {
    const { container } = render(<Button />);

    expect(container.firstChild.tagName).toBe('BUTTON');
  });

  test('#should render a button with text', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Hello</Button>);

    const elementRendered = screen.getByText('Hello');
    expect(elementRendered).toBeInTheDocument();
    fireEvent.click(elementRendered);
    expect(onClick).toBeCalled();
  });
});
