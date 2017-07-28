const express = require('../api/config/express')();
const request = require('supertest')(express);
const UsersDB = require('../api/models/Users');
const connect = require('../api/models/db').connection('test');


describe('#User Controller', () => {

  beforeEach(async() => {
    await UsersDB.remove().exec();
  });

  describe('#Show all user', () => {
    it('#Get users without auth', async() => {
      const res = await request.get('/api/users')
        .set('Accept', 'application/json');

      const isArrayResult = Array.isArray(res.body);
      expect(isArrayResult).toEqual(true);
      // expect(res).toMatchSnapshot();
    });


    it('#Get users with auth', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: user.body.newuser.user_name,
          password: 'teste1'
        });

      const res = await request.get('/api/auth/users')
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token);

      const isArrayResult = Array.isArray(res.body);
      expect(isArrayResult).toEqual(true);
      // expect(res).toMatchSnapshot();
    });

    it('#Erro to get user without auth', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: user.body.newuser.user_name,
          password: 'teste1'
        });

      const res = await request.get('/api/auth/users')
        .set('Accept', 'application/json')
        .set('x-access-token', '');
        
      expect(res.body.success).toEqual(false);
      // expect(res).toMatchSnapshot();
    });

    it('#Erro to get user with wrong auth', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: user.body.newuser.user_name,
          password: 'teste1'
        });

      const res = await request.get('/api/auth/users')
        .set('Accept', 'application/json')
        .set('x-access-token', `${login.body.token}a`);
        
      expect(res.body.success).toEqual(false);
      // expect(res).toMatchSnapshot();
    });
  });

  describe('#Create user', () => {
    it('#New user nonexistent', async() => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      expect(res.body.success).toEqual(true);
      expect(res.body.newuser.user_name).toEqual('nath');
      expect(res.body.newuser.user_mail).toEqual('nath@nath.com.br');
      // expect(res).toMatchSnapshot();
    });

    it('#New user empty user', async() => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: '',
          user_mail: 'nath@nath123.com',
          password: 'teste1'
        });

      // expect(res).toMatchSnapshot();
    });

    it('#New user empty mail', async() => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'lala',
          user_mail: '',
          password: 'teste1'
        });

      // expect(res).toMatchSnapshot();
    });


    it('#New user empty mail', async() => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'lala',
          user_mail: 'lala@lala.com',
          password: ''
        });

      // expect(res).toMatchSnapshot();
    });

    it('#New user existing with the same name different email', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@teste.com.br',
          password: 'teste1'
        });

      // expect(res).toMatchSnapshot();
    });

    it('#New user existing with the same email and different name', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nathinha',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      // expect(res).toMatchSnapshot();
    });
  });

  describe('#Login', () => {
    it('#Correct login in app', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const res = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: user.body.newuser.user_name,
          password: 'teste1'
        });

      // expect(res).toMatchSnapshot();
    });

    it('#Login with wrong pass', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const res = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: user.body.newuser.user_name,
          password: 'test1'
        });
      // console.log("res.body", res.body);
      expect(res.body.success).toEqual(false);
      // expect(res).toMatchSnapshot();
    });

    it('#Login with wrong user name', async() => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      const res = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'n4th',
          password: 'teste1'
        });
      // console.log("res.body", res.body);
      expect(res.body.success).toEqual(false);
      // expect(res).toMatchSnapshot();
    });
  });

});
