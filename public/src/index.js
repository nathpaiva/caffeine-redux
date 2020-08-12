'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App';
import ResetCSS from './RestCSS';

const renderApp = (NextApp) => {
  render(
    <AppContainer>
      <>
        <ResetCSS />
        <Router>
          <NextApp />
        </Router>
      </>
    </AppContainer>,
    document.querySelector('[data-js="app"]')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
