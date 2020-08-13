import React, { Component } from 'react';
import queryString from 'query-string';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Message from '../../components/message/Message';
import Box from '../../components/box';
import Title from '../../components/title';
import Fieldset from '../../components/fieldset';
import Label from '../../components/label';
import Input from '../../components/input';
import Button from '../../components/button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: queryString.parse(this.props.location.search).msg,
      typeMesage: queryString.parse(this.props.location.search).msg ? 'error' : '',
      tabIndex: 0,
    };
  }

  handleClick(e) {
    e.preventDefault();

    const requestInfo = {
      method: 'POST',
      body: { user_name: this.login.value, password: this.password.value },
      headers: new Headers({
        'Content-type': 'application/json',
      }),
    };

    let url = 'http://localhost:3000/api/login';
    if (this.email) {
      requestInfo.body.user_mail = this.email.value;
      url = 'http://localhost:3000/api/createuser';
    }

    requestInfo.body = JSON.stringify(requestInfo.body);

    fetch(url, requestInfo)
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          this.setState({
            msg: response.message,
            typeMesage: 'error',
          });
          throw new Error(this.state.msg);
        }

        if (this.email) {
          this.setState({
            msg: 'Usuário criado com sucesso, faça o login no caffeine!!!',
            typeMesage: 'success',
            tabIndex: 0,
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
      <>
        <Message className={this.state.typeMesage} msg={this.state.msg} />
        <form onSubmit={this.handleClick.bind(this)}>
          <Tabs selectedIndex={this.state.tabIndex} onSelect={(tabIndex) => this.setState({ tabIndex })}>
            <TabPanel>
              <Box>
                <Title>Login</Title>
                <p>Im already a caffeine customer.</p>

                <Fieldset>
                  <Label htmlFor="login">login</Label>
                  <Input type="text" id="login" placeholder="login" />
                </Fieldset>

                <Fieldset>
                  <Label htmlFor="pass">password</Label>
                  <Input type="password" id="pass" placeholder="password" />
                </Fieldset>

                <Button type="submit">Login</Button>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <Title>Register</Title>
                <p>First time using of caffeine.</p>

                <Fieldset>
                  <Label htmlFor="email">email</Label>
                  <Input require type="email" id="email" placeholder="email" />
                </Fieldset>

                <Fieldset>
                  <Label htmlFor="login">login</Label>
                  <Input require type="text" id="login" placeholder="login" />
                </Fieldset>

                <Fieldset>
                  <Label htmlFor="pass">password</Label>
                  <Input require type="password" id="pass" placeholder="password" />
                </Fieldset>

                <Button type="submit">Create</Button>
              </Box>
            </TabPanel>
            <TabList>
              <Tab>{`I'm already registered`}</Tab>
              <Tab>{`I'm not yet registered`}</Tab>
            </TabList>
          </Tabs>
        </form>
      </>
    );
  }
}

export default Login;
