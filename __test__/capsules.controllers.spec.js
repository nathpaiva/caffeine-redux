const { expect } = require("chai");
const express = require('../api/config/express')();
const request = require('supertest')(express);
const CapsulesDB = require('../api/models/Capsules');
require('../api/models/db').connection('test');

describe('#Capsules Controller', () => {

  beforeEach(async function () {
    await CapsulesDB.remove().exec();
    await request.post('/api/createuser')
      .set('Accept', 'application/json')
      .send({
        user_name: 'nath',
        user_mail: 'nath@nath.com.br',
        password: 'teste1'
      });

    this.timeout(0);
  });

  it('#Load all capsules by user', async () => {
    const login = await request.post('/api/login')
      .set('Accept', 'application/json')
      .send({
        user_name: 'nath',
        password: 'teste1'
      });

    const res = await request.get(`/api/auth/capsules/${login.body.user._id}`)
      .set('Accept', 'application/json')
      .set('x-access-token', login.body.token);

    const isArrayResult = Array.isArray(res.body.capsules);
    expect(isArrayResult).equal(true);
  });

  describe('#Create Capsules', () => {
    it('#Create capsule by user', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const res = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      expect(res.body.success).equal(true);
    });

    it('#Error to create capsule by user, empty user_name', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const res = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: '',
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      expect(res.body.success).equal(false);
    });

    it('#Error to create capsule by user, empty user_id', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const res = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: '',
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      expect(res.body.success).equal(false);
    });

    it('#Error to create capsule by user, empty quantity_capsules_per_week', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const res = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          price_last_buy: 20
        });

      expect(res.body.success).equal(false);
    });

    it('#Error to create capsule by user, empty notify_enf_capsules', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const res = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      expect(res.body.success).equal(false);
    });
  });

  describe('#Edit Capsules', () => {
    it('#Edit capsule by id', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.put(`/api/auth/capsule/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 9,
          price_last_buy: 29
        });

      expect(res.body.success).equal(true);
    });

    it('#Error to edit capsule by id - without user_name', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.put(`/api/auth/capsule/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 9,
          price_last_buy: 29
        });

      expect(res.body.success).equal(false);
    });

    it('#Error to edit capsule by id - without user_id', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.put(`/api/auth/capsule/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 9,
          price_last_buy: 29
        });

      expect(res.body.success).equal(false);
    });

    it('#Error to edit capsule by id - without notify_enf_capsules', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.put(`/api/auth/capsule/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          user_name: login.body.user.user_name,
          quantity_capsules_per_week: 9,
          price_last_buy: 29
        });

      expect(res.body.success).equal(false);
    });

    it('#Error to edit capsule by id - without quantity_capsules_per_week', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.put(`/api/auth/capsule/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          user_name: login.body.user.user_name,
          notify_enf_capsules: 4,
          price_last_buy: 29
        });

      expect(res.body.success).equal(false);
    });
  });


  describe('#Delete Capsules', () => {

    it('#Delete capsule', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.delete(`/api/auth/capsules/${login.body.user._id}/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token);

      expect(res.body.success).equal(true);
    });

    it('#Erro when Delete capsule without id of capsule in url', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.delete(`/api/auth/capsules/${login.body.user._id}/${newCapsule.body._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token);

      expect(res.body.success).equal(false);
    });

    it('#Erro when Delete capsule without id of user in url', async () => {
      const login = await request.post('/api/login')
        .set('Accept', 'application/json')
        .send({
          user_name: 'nath',
          password: 'teste1'
        });

      const newCapsule = await request.post(`/api/auth/capsules/${login.body.user._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token)
        .send({
          user_name: login.body.user.user_name,
          user_id: login.body.user._id,
          type_capsule: 'Intenso',
          brand_capsule: 'Nespresso',
          notify_enf_capsules: 4,
          quantity_capsules_per_week: 5,
          price_last_buy: 20
        });

      const res = await request.delete(`/api/auth/capsules/${login.body._id}/${newCapsule.body.data._id}`)
        .set('Accept', 'application/json')
        .set('x-access-token', login.body.token);

      expect(res.body.success).equal(false);
    });
  });
});
