const router = require('express').Router();
const DrinkerModel = require('../models/drinkerModel');

const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt
const jwt = require('jsonwebtoken');

// 新會員驗證
const regisValidation =
  require('../validation/joiValidations').registerValidation;

// 登入驗證
const loginValidation = require('../validation/joiValidations').loginValidation;

router.use((req, res, next) => {
  console.log('a client come into auth router');
  next();
});

// 新增會員的api
router.post('/register', async (req, res) => {
  const memberData = req.body.newDrinker;
  // joi驗證
  const validationRlt = regisValidation(memberData);

  // 如果驗證有error
  const { error } = validationRlt;

  if (error) {
    // 錯誤有給400, 會在.catch -> err.response接到
    // 沒給錯誤碼, 會在.then接到
    res.status(400);
    return res.send(error.details[0].message);
  }

  try {
    const foundMember = await DrinkerModel.findOne({ email: memberData.email });

    // email重複
    if (foundMember) {
      return res.status(400).send('email has been used !');
    }

    // 成功新增帳號, 加密, 存入DB
    const hashPassword = await bcrypt.hash(memberData.password, saltRounds);
    const newMember = await DrinkerModel({
      name: memberData.name,
      email: memberData.email,
      password: hashPassword,
    }).save();

    res.send({ message: 'ok', data: newMember });
  } catch (error) {
    console.log(error);
  }
});

// login的api
router.post('/login', async (req, res) => {
  const memberData = req.body.drinker;

  // joi驗證
  const validationRlt = loginValidation(memberData);

  // // 如果驗證有error
  const { error } = validationRlt;
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // email比對
  try {
    const foundMember = await DrinkerModel.findOne({ email: memberData.email });

    // 有找到此帳號
    if (foundMember) {
      // bcrypt解密
      bcrypt
        .compare(memberData.password, foundMember.password)
        .then(function (result) {
          if (result) {

            // sign JWT
            // jwt.sign後面的秘密號碼要跟 passport設定檔內secretOrKey一樣!
            const { _id, email, name } = foundMember;
            const signObject = { _id, email, name };
            const token = jwt.sign(signObject, process.env.PASSPORT_SECRET);

            return res.send({
              message: 'OK',
              token: 'JWT ' + token,
              data: foundMember,
            });

          }
          // 密碼錯誤
          return res.send('password is wrong');
        });
    } else {
      return res.send('no member');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
