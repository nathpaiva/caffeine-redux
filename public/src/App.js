'use strict';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from './components/history';

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
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={Login} history={history} />
          <Route exact path='/logout' component={Logout} history={history} />
          <Authenticated exact path='/list/:id' component={List} history={history} />
          <Authenticated exact path='/create/:id' component={Create} history={history} />
          <Authenticated exact path='/edit/:user_id/:id' component={Edit} history={history} />
          <Route exact component={NotFound} history={history} />
        </Switch>
      </>
    );
  }
}

export default App;
