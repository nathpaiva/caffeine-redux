'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from './components/history';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { capsulesReducer } from './reducers/capsules';
import { messageReducer } from './reducers/message';
const reducers = combineReducers({ capsulesReducer, messageReducer })
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

import Authenticated from './components/authenticated/Authenticated'

import Header from './components/header/Header';

import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import Edit from './components/edit/Edit';
import Create from './components/create/Create';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Login} history={history} />
          <Route exact path='/logout' component={Logout} history={history} />
          <Authenticated exact path='/list/:id' component={List} history={history} store={store} />
          <Authenticated exact path='/create/:id' component={Create} history={history} store={store} />
          <Authenticated exact path='/edit/:user_id/:id' component={Edit} history={history} store={store} />
          <Route exact component={NotFound} history={history} />
        </Switch>
      </div>
    );
  }
}

export default App;
