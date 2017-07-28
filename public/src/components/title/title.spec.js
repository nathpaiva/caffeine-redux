'use stict';

import React from 'react';
import renderer from 'react-test-renderer';

import Title from './Title';


describe('#Test Title Component', () => {
  it('#Should Title to mach snapshot', () => {
    const tree = renderer.create(<Title title='Cadastre-se' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
