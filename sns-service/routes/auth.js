const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const passport = require('passport');

const router = express.Router();

//회원가입 라우터
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist'); //존재하면
    }
    const hash = await bcrypt.hash(password, 12); //해쉬화 12-> 숫자가 높을 수록 복잡함
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//프론트에서 서버로 요청을 보낼때 여기 라우터에 걸림
//미들웨어 확장하는 패턴
router.post('/login', isNotLoggedIn, (req, res, next) => {
  //login -> passport.authenticate('local') 이 실행됨 ->  index.js에 등록해둠 -> localStrategy 가 실행됨
  passport.authenticate('local', (authError, user, info) => {
    if(authError) { //에러 처리
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`); //실패 시 해당 프론트 단으로 이동
    }
    return req.login(user, (loginError) => {
      if(loginError) { //index.js 이동 -> passport.serializeUser 실행
        console.error(loginError);
        return next(loginError);
      }
      //세션 쿠키를 브라우저로 보내줌
      return res.redirect('/'); //로그인 성공
    });
  })(req, res, next); //미들웨어 내의 미들웨어는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(); //세션 쿠키 사라짐
  req.session.destroy(); //세션 자체 파괴
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;