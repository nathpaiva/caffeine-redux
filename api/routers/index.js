const express = require('express');
const { check } = require('express-validator');

const CheckAuth = require('./checkAuth');

module.exports = function (app) {

  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  apiRoutes.post('/login', app.controllers.Users.authenticated);
  apiRoutes.post('/createuser', [
    check('user_name', 'Nome de usuário é obrigatório').notEmpty(),
    check('user_mail', 'Email é obrigatório').isEmail(),
    check('password', 'Senha é obrigatório').notEmpty()
  ], app.controllers.Users.createUser);
  apiRoutes.get('/users', app.controllers.Users.listUsers);

  // AUTH
  authRoutes.get('/users', CheckAuth, app.controllers.Users.listUsers);
  authRoutes.get('/capsules/:userId', CheckAuth, app.controllers.Capsules.loadCapsulesToUser);
  authRoutes.post('/capsules/:userId', CheckAuth, [
    check('user_name', 'Nome de usuário é obrigatório').notEmpty(),
    check('user_id', 'O id do usuário é obrigatório').notEmpty(),
    check('type_capsule', 'Tipode da capsula é obrigatório').notEmpty(),
    check('brand_capsule', 'A marca da capsula é obrigatório').notEmpty(),
    check('quantity_capsules_per_week', 'Quantidade de cápsulas por semana é obrigatório').notEmpty(),
    check('notify_enf_capsules', 'Notificar quando finalizar é obrigatório').notEmpty(),
  ], app.controllers.Capsules.createNewCapsule);
  authRoutes.get('/capsule/:capsId', CheckAuth, app.controllers.Capsules.loadOneCapsules);
  authRoutes.put('/capsule/:capsId', CheckAuth, [
    check('user_name', 'Nome de usuário é obrigatório').notEmpty(),
    check('user_id', 'O id do usuário é obrigatório').notEmpty(),
    check('quantity_capsules_per_week', 'Quantidade de cápsulas por semana é obrigatório').notEmpty(),
    check('notify_enf_capsules', 'Notificar quando finalizar é obrigatório').notEmpty(),
  ], app.controllers.Capsules.updateCapsule);
  authRoutes.delete('/capsules/:userId/:capsId', CheckAuth, app.controllers.Capsules.deleteCapsule);
  // authRoutes.post('/create/capsules/user', CheckAuth, app.controllers.Capsules.createCapsulesToUser);

  app.use('/api', apiRoutes);
};
