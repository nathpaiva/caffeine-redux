const mongoose = require('mongoose');
// const port = process.env.PORT || 3000; // used to create, sign, and verify tokens
let dbURL = 'mongodb://localhost/caffeine';

module.exports.connection = (type) => {
  if (type === 'test') {
    dbURL = 'mongodb://localhost/caffeine_test';
  }

  const db = mongoose.connection;
  db.on('error', function (err) {
    // console.log('Erro de conexao.', err);
  });
  db.on('open', function () {
    // console.log('Conexão aberta.');
  });
  db.on('connected', function (err) {
    mongoose.Promise = global.Promise;
    // console.log('Conectado');
  });
  db.on('disconnected', function (err) {
    // console.log('Desconectado');
  });

  mongoose.Promise = global.Promise;
  return mongoose.connect(dbURL);
};
