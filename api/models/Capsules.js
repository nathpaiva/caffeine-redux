var mongoose = require('mongoose');

const capsulesSchema = new mongoose.Schema({
  user_name: {
    type: String,
    default: ''
  },
  user_id: {
    type: String,
    default: ''
  },
  brand_capsule: {
    type: String,
    default: ''
  },
  type_capsule: {
    type: String,
    default: ''
  },
  price_last_buy: {
    type: Number,
    min: 0,
    default: null
  },
  quantity_capsules_per_week: {
    type: Number,
    min: 0,
    default: null
  },
  notify_enf_capsules: {
    type: Number,
    min: 0,
    default: null
  },
  data: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Capsules', capsulesSchema);
