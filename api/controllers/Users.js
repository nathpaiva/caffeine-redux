const UsersDB = require('../models/Users');
const servicesMemcached = require('../services/memcachedClient');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const _generateToken = (user, secret) => jwt.sign(user.toJSON(), secret, {
  // expiresIn: 60 * 60 * 24
  // expiresIn: 300 // in seconds
  expiresIn: 60 * 60 * 24 // in seconds
});

const apiUsers = {};

apiUsers.listUsers = (req, res) => {
  UsersDB.find({}, function (err, users) {
    res.json(users);
  });
};

apiUsers.authenticated = (req, res) => {
  const getUser = req.body;

  // return;
  UsersDB.findOne({
    user_name: getUser.user_name
  }, function (err, user) {

    if (err) {
      throw err;
    }

    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // decrypt password to check if is the same what the user use
      UsersDB.comparePassword(getUser.password, user.password, (reqq, isMatch) => {
        if (!isMatch) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          // if user is found and password is right
          // create a token
          const token = _generateToken(user, req.app.get('superSecret'));
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
            user
          });
        }
      });
    }
  });
};

apiUsers.createUser = (req, res) => {
  let user = req.body;

  const errors = validationResult(req);
  if (errors.errors.length) {
    res.status(400).send(errors);
    return;
  }
  // check if have user
  UsersDB.find({
    $or: [{
      user_name: user.user_name
    }, {
      user_mail: user.user_mail
    }]
  }, (err, data) => {

    if (err || data.length > 0) {

      res.status(400).json({
        success: false,
        message: 'User already exists.'
      });
      return;
    }

    const newUser = new UsersDB(user);
    UsersDB.createUser(newUser, (req, newuser) => {
      res.status(201).json({
        success: true,
        newuser
      });
    });
  });
};

module.exports = apiUsers;
