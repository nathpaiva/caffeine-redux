'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from './NotFound';

describe('#Test Page NotFound', () => {
  it('#Should Page NotFound', () => {
    const tree = renderer.create(<NotFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
