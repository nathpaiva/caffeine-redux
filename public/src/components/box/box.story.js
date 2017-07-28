import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../../css/_reset.scss';
import Box from './Box';

storiesOf('Box', module)
  .add('with inputs', () => <Box title='Register' text='First time using of caffeine.' inputs={[
    {
      type: 'email',
      id: 'email',
      text: 'email'
    },
    {
      type: 'text',
      id: 'login',
      text: 'login'
    },
    {
      type: 'password',
      id: 'pass',
      text: 'password'
    }
  ]} button='Create' />)
  .add('without inputs', () => <Box title='Info caps' button='Add new capsule' />)
  .add('with inputs disabled and without button and title', () => <Box inputs={[
    {
      type: 'email',
      id: 'email',
      text: 'email',
      disabled: true
    },
    {
      type: 'text',
      id: 'login',
      text: 'login',
      disabled: true
    },
    {
      type: 'password',
      id: 'pass',
      text: 'password',
      disabled: true
    }
  ]} />);
