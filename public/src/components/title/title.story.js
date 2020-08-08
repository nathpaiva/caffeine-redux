import React from 'react';

import { storiesOf } from '@storybook/react';

import Title from './Title';

storiesOf('Title on center', module).add('set a title to show', () => <Title title='Cadastre-se' />);
