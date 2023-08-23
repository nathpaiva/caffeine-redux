const { expect } = require("chai");
const express = require('../api/config/express')();
const request = require('supertest')(express);
const UsersDB = require('../api/models/Users');
require('../api/models/db').connection('test');


describe('#User Controller', () => {
  it('should be true', () => {
    expect(true).equal(true)
  })

  beforeEach(async () => {
    await UsersDB.remove().exec();
  });

  describe('#Show all user', () => {
    it('#Get users without auth', async () => {
      const res = await request.get('/api/users')
        .set('Accept', 'application/json');

      const isArrayResult = Array.isArray(res.body);
      expect(isArrayResult).equal(true);
    });


    it('#Get users with auth', async () => {
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
      expect(isArrayResult).equal(true);
    });

    it('#Erro to get user without auth', async () => {
      const user = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: user.body.newuser.user_name,
          password: 'teste1'
        });

      const res = await request.get('/api/auth/users')
        .set('Accept', 'application/json')
        .set('x-access-token', '');

      expect(res.body.success).equal(false);
    });

    it('#Erro to get user with wrong auth', async () => {
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

      expect(res.body.success).equal(false);
    });
  });

  describe('#Create user', () => {
    it('#New user nonexistent', async () => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          user_mail: 'nath@nath.com.br',
          password: 'teste1'
        });

      expect(res.body.success).equal(true);
      expect(res.body.newuser.user_name).equal('nath');
      expect(res.body.newuser.user_mail).equal('nath@nath.com.br');
    });

    it('#New user empty user', async () => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: '',
          user_mail: 'nath@nath123.com',
          password: 'teste1'
        });

      expect(res.body.errors[0].msg).equal('Nome de usuário é obrigatório');
    });

    it('#New user empty mail', async () => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'lala',
          user_mail: '',
          password: 'teste1'
        });

      expect(res.body.errors[0].msg).equal('Email é obrigatório');
    });


    it('#New user empty mail', async () => {
      const res = await request.post('/api/createuser')
        .set('Accept', 'application/json')
        .send({
          user_name: 'lala',
          user_mail: 'lala@lala.com',
          password: ''
        });

      expect(res.body.errors[0].msg).equal('Senha é obrigatório');
    });

    it('#New user existing with the same name different email', async () => {
      await request.post('/api/createuser')
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

      expect(res.body.success).equal(false);
      expect(res.body.message).equal('User already exists.');
    });

    it('#New user existing with the same email and different name', async () => {
      await request.post('/api/createuser')
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

      expect(res.body.success).equal(false);
      expect(res.body.message).equal('User already exists.');
    });
  });

  describe('#Login', () => {
    it('#Correct login in app', async () => {
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


      expect(res.body.success).equal(true);
    });

    it('#Login with wrong pass', async () => {
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

      expect(res.body.success).equal(false);
      expect(res.body.message).equal('Authentication failed. Wrong password.');
    });

    it('#Login with wrong user name', async () => {
      await request.post('/api/createuser')
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

      expect(res.body.success).equal(false);
      expect(res.body.message).equal('Authentication failed. User not found.');
    });
  });

});
