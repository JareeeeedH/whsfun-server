const express = require("express");
const cors = require("cors");
const app = express();

// 會員相關的route
const authRouter = require("./routes").authRouter;
const messageRouter = require("./routes").messageRouter;

// mongoose
const mongoose = require("mongoose");

app.use(cors());
require("dotenv").config();

// middleWare for post/put request
// #for json
app.use(express.json());
// #for strings or arrays
app.use(express.urlencoded({ extended: true }));

// 註冊會員的model
// const Drinker = require('./models/drinkerModel');

// 訊息的Model
// const Message = require("./models/messageModel");
// Message.deleteMany({}).then((d) => {
//   console.log(d);
// });

// passport與 passport-jwt設定
const passport = require("passport");
require("./config/jwt-config")(passport);

// 連線DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongoDB is connected !");
  })
  .catch((err) => {
    console.log("error to connect !");
  });

app.get("/", (req, res) => {
  console.log("a client come in index router");
  res.send("Welcome to whiskey fun");
});

// 會員相關api路由
app.use("/api/member", authRouter);

// po訊息api路由, 需要有會員, 需要有jwt驗證
app.use("/api/message", passport.authenticate("jwt", { session: false }), messageRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("running on port of 3000");
});
