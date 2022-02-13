const router = require('express').Router();
const DrinkerModel = require('../models/drinkerModel');

// joi validation
const newMemberValidation =
  require('../validation/joiValidations').registerValidation;

router.use((req, res, next) => {
  console.log('a client come into auth router');
  next();
});

router.post('/register', async (req, res) => {
  const memberData = req.body.newDrinker;
  // joi驗證
  const validationRlt = newMemberValidation(memberData);

  // 如果驗證有error
  const { error } = validationRlt;

  if (error) {
    // 錯誤有給400, 會在.catch -> err.response接到
    // 沒給錯誤碼, 會在.then接到
    res.status(400);
    return res.send(error.details[0].message);
  }

  try {
    const foundMember = await DrinkerModel.find();
    res.send({ message: 'ok', data: foundMember });
  } catch (error) {
    console.log(error);
  }

  // res.send({ message: 'ok', data: memberData });
});

module.exports = router;
