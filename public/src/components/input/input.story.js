import React from 'react';

import { storiesOf } from '@storybook/react';

import Input from './Input';

storiesOf('Input', module)
  .add('without label 100% width', () => <Input type='email' id='email' text='email' value='nath@nath.com.br' />)
  .add('with label 100% width', () => <Input type='email' id='email' text='email' value='nath@nath.com.br' label='Email' />)
  .add('disabled without label 100% width', () => <Input type='email' id='email' text='email' value='nath@nath.com.br' disabled='true' />)
  .add('disabled with label 100% width', () => <Input type='email' id='email' text='email' value='nath@nath.com.br' label='Email' disabled='true' />);
