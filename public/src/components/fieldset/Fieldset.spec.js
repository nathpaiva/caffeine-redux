'use strict';
import React from 'react';
import { screen, render } from '@testing-library/react';

import Fieldset from './Fieldset';

describe('#Fieldset', () => {
  test('#should render a Fieldset without text', () => {
    const { container } = render(<Fieldset />);

    expect(container.firstChild.tagName).toBe('FIELDSET');
  });

  test('#should render a Fieldset with text', () => {
    render(<Fieldset>Hello</Fieldset>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
