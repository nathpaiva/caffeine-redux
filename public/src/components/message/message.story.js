import React from 'react';

import { storiesOf } from '@storybook/react';

import Message from './Message';

storiesOf('Message', module)
  .add('success message', () => <Message className='success' msg='Success message' />)
  .add('error message', () => <Message className='error' msg='Error message' />);
