const mongoose = require("mongoose");

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
    min: 30,
    max: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  speaker: {
    // 綁上註冊者的id
    type: mongoose.Schema.Types.ObjectId,
    // 與Drinker可以使用於populate
    ref: "Drinker",
  },
  // 若是現有的whiskyFun的資料, 綁上一樣id
  funId: {
    type: String,
  },
  nose: {
    type: String,
  },
  taste: {
    type: String,
  },
  finish: {
    type: String,
  },
});

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;
