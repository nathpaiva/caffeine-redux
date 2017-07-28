'use stict';

import React from 'react';
import renderer from 'react-test-renderer';

import Container from './Container';


describe('#Test Container Component', () => {
  it('#Should Container to mach snapshot - li item', () => {
    const tree = renderer.create(<Container><div>Oioi</div></Container>).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
