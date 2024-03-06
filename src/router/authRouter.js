const { Router } = require('express');
const { userService } = require('../services');
const transPorter = require('../config/email');
const { buildResponse } = require('../misc/utils');
const router = Router();
const { isAuthenticated, asyncHandler, validator } = require('../middlewares');


// 관리자 계정 생성하기
// router.post('/register-admin', [validator.loginCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
//   const { id, pw, name, email, phone } = req.body;
//   const newAdmin = await userService.postAdmin({
//     id, pw, name, email, phone
//   });
//   res.json(buildResponse(newAdmin));
// }))

// 로그인
router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { id, pw } = req.body;
    const userToken = await userService.getUserToken({ id, pw });
    res.cookie('loginToken', userToken).json(buildResponse({ msg: '로그인 성공', isLogin: true }));
  })
);

// 회원가입
router.post(
  '/register',
  [validator.registerCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    const { id, pw, name, email, phone } = req.body;
    const newUser = await userService.postUser({
      id,
      pw,
      name,
      email,
      phone,
    });
    res.json(buildResponse(newUser));
  })
);

// 아이디 중복검사
router.post(
  '/checkDupId',
  [validator.idCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const isDuplicate = await userService.isDuplicated(id);
    res.json(buildResponse(isDuplicate));
  })
);

// router.get(
//   '/:id',
//   asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const user = await userService.getUserInfo(id);
//     res.json(buildResponse(user));
//   })
// );

router.get(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res, next) => {
    const id = req.userId;
    const user = await userService.getUserInfo(id);
    res.json(buildResponse(user));
  })
);

router.put('/logout', async (req, res, next) => {
  return res.clearCookie('loginToken').end();
});

router.post(
  '/search-id',
  [isAuthenticated, validator.emailCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const userId = await userService.getId(email);
    res.json(buildResponse(userId));
  })
);

router.patch(
  '/reset-pw',
  [isAuthenticated, validator.resetpwCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    const { id, email } = req.body;
    const resetPw = await userService.postPW({ id, email });
    const mailOptions = {
      from: 'kimsungjin927@gmail.com',
      to: email,
      subject: '[eliceCoffee] 비밀번호 초기화',
      text: '초기화된 비밀번호입니다. ' + resetPw,
    };
    transPorter.sendMail(mailOptions, (err, info) => {
      console.log(mailOptions);
      if (err) {
        console.log(err);
      }
      res.json(buildResponse(resetPw));
      sendEmail.close();
    });
  })
);

router.put(
  '/me',
  isAuthenticated,
  [validator.meCheck, validator.validatorError],
  asyncHandler(async (req, res, next) => {
    const { email, phone, newPw } = req.body;
    const userId = req.userId;
    const editUser = await userService.putUser({
      userId, email, phone, newPw
    });
    res.json(buildResponse(editUser));
  })
);

router.put(
  '/withdrawal', isAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userToken = req.cookies.loginToken.token;
    const deleteUser = await userService.deleteUser(userToken);
    res.json(buildResponse(deleteUser));
  })
);

router.put('/updateTotal', [validator.updateTotalCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
  const id = req.body.id;
  const price = Number(req.body.price);
  const updateTotal = await userService.putTotal({
    id, price
  });
  res.json(buildResponse(updateTotal));
}))

router.put('/updateRank', [validator.idCheck, validator.validatorError], asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const updateRank = await userService.putRank(id);
  res.json(buildResponse(updateRank));
}))

module.exports = router;
