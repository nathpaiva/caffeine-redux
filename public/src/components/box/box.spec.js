'use strict';

import React from 'react';
import renderer from 'react-test-renderer';

import Box from './Box';

describe('#Test Box Component', () => {
  it('#Should Box with success', () => {
    const tree = renderer
      .create(
        <Box
          title='Register'
          text='First time using of caffeine.'
          inputs={[
            {
              type: 'email',
              id: 'email',
              text: 'email',
              inputRef: (input) => {
                var email = input;
                return email;
              },
            },
            {
              type: 'text',
              id: 'login',
              text: 'login',
              inputRef: (input) => {
                var login = input;
                return login;
              },
            },
            {
              type: 'password',
              id: 'pass',
              text: 'password',
              inputRef: (input) => {
                var password = input;
                return password;
              },
            },
          ]}
          button='Create'
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
