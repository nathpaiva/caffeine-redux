import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Title from './Title';

storiesOf('Title on center', module)
  .add('set a title to show', () => <Title title='Cadastre-se' />);
