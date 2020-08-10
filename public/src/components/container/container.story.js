import React from 'react';

import { storiesOf } from '@storybook/react';

import Container from './Container';

storiesOf('Container', module).add('without label 100% width', () => (
  <ul>
    <Container>List of items</Container>
  </ul>
));
