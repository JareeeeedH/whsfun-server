// jwt-passport的設定檔, 使用於需要驗證的路由

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// model
const Drinker = require('../models/drinkerModel')

module.exports = (passport) => {
  var opts = {};

  // 從header的authorization找到jwt這個token, 這個token就是簽過的那筆資料
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

  // #很重要 
  // secretOrKey 要等於 jwt.sign簽token後面那個秘密號碼
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      
      // jwt_payload是那組簽過的 sign Object
      console.log('jwt_payload, sign object簽的內容 ----->', jwt_payload);
      
      // DB尋找資料
      Drinker.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          console.log('sign object簽的內容的id跟資料庫尋找, 找到資料庫中的data ----->', user)
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};