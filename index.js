const express = require('express');
const cors = require('cors');
const app = express();

// 會員相關的route
const authRouter = require('./routes').authRouter;

// mongoose
const mongoose = require('mongoose');

app.use(cors());
require('dotenv').config();

// middleWare for post/put request
// #for json
app.use(express.json());
// #for strings or arrays
app.use(express.urlencoded({ extended: true }));

// 註冊會員的model
const Drinker = require('./models/drinker');

// 連線DB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('mongoDB is connected !');
  })
  .catch((err) => {
    console.log('error to connect !');
  });

app.get('/', (req, res) => {
  console.log('a client come in index router');
  res.send('Welcome to whiskey fun');
});

// 會員相關api路由
app.use('/api/member', authRouter);

app.listen(3000, () => {
  console.log('running on port of 3000');
});
