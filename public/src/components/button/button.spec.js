'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('#Test Button Component', () => {
  it('#Should Button to mach snapshot', () => {
    const tree = renderer.create(<Button name='Entrar' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
