'use strict';

import React from 'react';
import { render, screen } from '@testing-library/react';

import Box from './Box';

describe('#Box', () => {
  test('#should box with section without text', () => {
    const { container } = render(<Box />);

    expect(container.firstChild.tagName).toBe('SECTION');
  });

  test('#should box with text', () => {
    render(<Box>Hello</Box>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('#should box with div', () => {
    const { container } = render(<Box as="div" />);

    expect(container.firstChild.tagName).toBe('DIV');
  });
});
