const CapsulesDB = require('../models/Capsules');
const servicesMemcached = require('../services/memcachedClient');
const jwt = require('jsonwebtoken');

const apiCapsules = {};


apiCapsules.loadCapsulesToUser = (req, res) => {
  const id = req.params.userId;
  CapsulesDB.find({
    user_id: id
  }, function (err, capsules) {
    if (err) {
      res.json({
        success: false,
        message: 'Error to load capsules'
      });
    }
    res.json({
      success: true,
      capsules
    });
  });
};

apiCapsules.loadOneCapsules = (req, res) => {
  const id = req.params.capsId;
  CapsulesDB.findOne({
    _id: id
  }, function (err, capsules) {
    if (err) {
      res.json({
        success: false,
        message: 'Error to load capsules'
      });
    }
    res.json({
      success: true,
      capsules
    });
  });
};

apiCapsules.createNewCapsule = (req, res) => {
  let newCapsuleItem = req.body;

  req.assert('user_name', 'Nome de usuário é obrigatório').notEmpty();
  req.assert('user_id', 'O id do usuário é obrigatório').notEmpty();
  req.assert('type_capsule', 'Tipode da capsula é obrigatório').notEmpty();
  req.assert('brand_capsule', 'A marca da capsula é obrigatório').notEmpty();
  req.assert('quantity_capsules_per_week', 'Quantidade de cápsulas por semana é obrigatório').notEmpty();
  req.assert('notify_enf_capsules', 'Notificar quando finalizar é obrigatório').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send({
      success: false,
      errors
    });
    return;
  }

  const capsules = new CapsulesDB(newCapsuleItem);

  capsules.save((err, data) => {
    res.status(200).json({
      success: true,
      data
    });
  });
}

apiCapsules.updateCapsule = (req, res) => {
  var query = { _id: req.params.capsId },
    mod = req.body;

  req.assert('user_name', 'Nome de usuário é obrigatório').notEmpty();
  req.assert('user_id', 'O id do usuário é obrigatório').notEmpty();
  req.assert('quantity_capsules_per_week', 'Quantidade de cápsulas por semana é obrigatório').notEmpty();
  req.assert('notify_enf_capsules', 'Notificar quando finalizar é obrigatório').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send({
      success: false,
      errors
    });
    return;
  }

  CapsulesDB.update(query, mod, function (err, data) {
    res.status(200).json({
      success: true,
      data,
      capsules: mod
    });
  });
}

apiCapsules.deleteCapsule = (req, res) => {
  var query = { _id: req.params.capsId };

  if (req.params.capsId === 'undefined' || req.params.userId === 'undefined') {
    res.status(400).json({
      success: false
    });
    return;
  }

  CapsulesDB.remove(query, function (err, data) {

    const id = req.params.userId;

    CapsulesDB.find({
      user_id: id
    }, function (err, capsules) {
      if (err) {
        res.json({
          success: false,
          message: 'Error to load capsules'
        });
      }
      res.json({
        success: true,
        capsules
      });
    });
    // res.status(200).json({
    //   success: true,
    //   data
    // });
  });
}

module.exports = apiCapsules;
