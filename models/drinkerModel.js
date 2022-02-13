const mongoose = require('mongoose');

const drinkerScheme = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 24,
    required: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },

  data: {
    type: Date,
    default: Date.now,
  },
});

const DrinkerModel = mongoose.model('Drinker', drinkerScheme);

module.exports = DrinkerModel;
