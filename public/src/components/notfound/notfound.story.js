import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import NotFound from './NotFound';

storiesOf('NotFound', module)
  .add('without label 100% width', () => <NotFound />);
