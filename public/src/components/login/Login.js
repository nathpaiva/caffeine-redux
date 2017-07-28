import React, { Component } from 'react';
import queryString from 'query-string';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Message from '../message/Message';
import Box from '../box/Box';

import style from '../../css/inline';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: queryString.parse(this.props.location.search).msg,
      typeMesage: queryString.parse(this.props.location.search).msg ? 'error' : '',
      tabIndex: 0
    }
  }

  handleClick(e) {
    e.preventDefault();

    const requestInfo = {
      method: 'POST',
      body: { user_name: this.login.value, password: this.password.value },
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    let url = 'http://localhost:3000/api/login';
    if (!!this.email) {
      requestInfo.body.user_mail = this.email.value;
      url = 'http://localhost:3000/api/createuser';
    }

    requestInfo.body = JSON.stringify(requestInfo.body);

    fetch(url, requestInfo)
      .then(response => response.json())
      .then(response => {
        if (!response.success) {
          this.setState({
            msg: response.message,
            typeMesage: 'error'
          });
          throw new Error(this.state.msg);
        }

        if (!!this.email) {
          this.setState({
            msg: 'Usuário criado com sucesso, faça o login no caffeine!!!',
            typeMesage: 'success',
            tabIndex: 0
          });
          return;
        }

        localStorage.setItem('auth-token', JSON.stringify(response.token));
        localStorage.setItem('user', JSON.stringify(response.user));
        this.props.history.push(`/list/${response.user._id}`);
      });
  }

  render() {
    return (
      <div>
        <Message className={this.state.typeMesage} msg={this.state.msg} />
        <form onSubmit={this.handleClick.bind(this)}>
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabPanel>
              <Box title='Login' text='Im already a caffeine customer.' inputs={[
                { type: 'text', id: 'login', text: 'login', inputRef: (input) => this.login = input },
                { type: 'password', id: 'pass', text: 'password', inputRef: (input) => this.password = input }
              ]} button='Login' />
            </TabPanel>
            <TabPanel>
              <Box title='Register' text='First time using of caffeine.' inputs={[
                { type: 'email', id: 'email', text: 'email', inputRef: (input) => this.email = input },
                { type: 'text', id: 'login', text: 'login', inputRef: (input) => this.login = input },
                { type: 'password', id: 'pass', text: 'password', inputRef: (input) => this.password = input }
              ]} button='Create' />
            </TabPanel>
            <TabList>
              <Tab>I'm already registered</Tab>
              <Tab>I'm not yet registered</Tab>
            </TabList>
          </Tabs>
        </form>
      </div>
    )
  }
}

export default Login;
