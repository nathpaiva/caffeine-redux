'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppContainer } from 'react-hot-loader';
import App from './App';
import ResetCSS from './RestCSS';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { capsulesReducer } from './reducers/capsules';
import { messageReducer } from './reducers/message';
const reducers = combineReducers({ capsulesReducer, messageReducer })
const store = createStore(reducers, applyMiddleware(thunkMiddleware));
console.log("store", store)


const renderApp = (NextApp) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ResetCSS />
        <Router>
          <NextApp />
        </Router>
      </Provider>
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
