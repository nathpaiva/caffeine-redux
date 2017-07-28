const express = require('express');
const CheckAuth = require('./checkAuth');

module.exports = function (app) {

  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  apiRoutes.post('/login', app.controllers.Users.authenticated);
  apiRoutes.post('/createuser', app.controllers.Users.createUser);
  apiRoutes.get('/users', app.controllers.Users.listUsers);

  authRoutes.get('/users', CheckAuth, app.controllers.Users.listUsers);
  authRoutes.get('/capsules/:userId', CheckAuth, app.controllers.Capsules.loadCapsulesToUser);
  authRoutes.post('/capsules/:userId', CheckAuth, app.controllers.Capsules.createNewCapsule);
  authRoutes.get('/capsule/:capsId', CheckAuth, app.controllers.Capsules.loadOneCapsules);
  authRoutes.put('/capsule/:capsId', CheckAuth, app.controllers.Capsules.updateCapsule);
  authRoutes.delete('/capsules/:userId/:capsId', CheckAuth, app.controllers.Capsules.deleteCapsule);
  // authRoutes.post('/create/capsules/user', CheckAuth, app.controllers.Capsules.createCapsulesToUser);

  app.use('/api', apiRoutes);
};
