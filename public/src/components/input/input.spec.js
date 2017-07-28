'use stict';

import React from 'react';
import renderer from 'react-test-renderer';

import Input from './Input';


describe('#Test Input Component', () => {
  it('#Should Input to mach snapshot without label', () => {
    const tree = renderer.create(<Input type='email' id='email' text='email' value='nath@nath.com.br' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('#Should Input to mach snapshot with label', () => {
    const tree = renderer.create(<Input type='email' id='email' text='email' value='nath@nath.com.br' label='Email' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
