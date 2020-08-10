import React from 'react';

import { storiesOf } from '@storybook/react';

import Button from './Button';

storiesOf('Button', module).add('with text 100% width', () => <Button name='Entrar' />);
