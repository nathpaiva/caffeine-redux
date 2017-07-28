const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  user_name: {
    type: String,
    default: ''
  },
  user_mail: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  create_date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Users', usersSchema);

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
