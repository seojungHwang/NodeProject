const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
      usernameField: 'email', //req.body.password
      passwordField: 'password', //req.body.password
    }, async (email, password, done) => {
      try {
        const exUser = await User.findOne({ where: { email } }); //email있는 사람 찾기
        if (exUser) {
          const result = await bcrypt.compare(password, exUser.password); //bcrypt.compare -> 해쉬화된 비밀번호 비교 exUser.password 디비에 있는 비번
          if (result) {
            done(null, exUser); //1-> 서버에러, 2-> 로그인 성공,
          } else {
            done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          }
        } else {
          done(null, false, { message: '가입되지 않은 회원입니다.' }); //done함수는 인자를 3개 받음
                                                          //1-> 서버에러, 2-> 로그인 성공, 3-> 로그인 실패시
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }));
  };