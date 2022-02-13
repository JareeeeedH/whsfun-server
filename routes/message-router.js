const router = require('express').Router();
const messageModel = require('../models/messageModel');

router.use((req, res, next) => {
  console.log('client into  message route');
  next();
});

router.post('/post', async (req, res) => {
  const { title, content, points } = req.body.postData;

  try {
    const newPost = await messageModel({ title, content, points }).save();
    return res.send({ message: 'ok', data: newPost });
  } catch (err) {
    console.log('post message Error --->', err);
    return res.status(400).send({ message: 'failed', err });
  }
});

module.exports = router;
