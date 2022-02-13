const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },
  content: {
    type: String,
    minlength: 3,
    maxlength: 2500,
    required: true,
  },
  points: {
    type: Number,
    min: 60,
    max: 100,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  instructor: {
    // 綁上註冊者的id
    type: mongoose.Schema.Types.ObjectId,
    // 與Drinker可以使用於populate
    ref: 'Drinker',
  },
});

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;
