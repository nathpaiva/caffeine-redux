import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../../css/_reset.scss';
import Container from './Container';

storiesOf('Container', module)
  .add('without label 100% width', () => <ul><Container>List of items</Container></ul>);
