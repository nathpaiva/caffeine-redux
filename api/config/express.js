'user strict'

const express = require('express');
const app = express();
var router = express.Router();

const bodyParse = require('body-parser');
const morgan = require('morgan');
const logger = require('../services/logger');

const jwt = require('jsonwebtoken');
const config = require('../models/config');

const consign = require('consign')({
  cwd: 'api'
});

const expressValidator = require('express-validator');
const path = require('path');


module.exports = () => {

  // =======================
  // configuration =========
  // =======================
  app.set('superSecret', config.secret); // secret variable

  app.use(bodyParse.urlencoded({
    extended: true
  }));
  app.use(bodyParse.json());
  app.use(express.static('../../public'));

  app.use(morgan('common', {
    stream: {
      write: (msg) => {
        logger.info(msg);
      }
    }
  }));

  app.use(expressValidator());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, x-access-token");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  consign
    .include('controllers')
    .then('routers')
    .into(app);

  return app;
}
