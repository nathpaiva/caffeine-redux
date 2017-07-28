'use stict';

import React from 'react';
import renderer from 'react-test-renderer';

import Message from './Message';


describe('#Test Message Component', () => {
  it('#Should Message with success', () => {
    const tree = renderer.create(<Message className='success' msg='Success message' />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('#Should Message with error', () => {
    const tree = renderer.create(<Message className='error' msg='Error message' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
