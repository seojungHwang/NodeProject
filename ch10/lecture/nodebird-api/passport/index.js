const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');
const { Include } = require('nunjucks/src/nodes');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null,user.id); //세션에 user의 id만 저장(다른 정보 저장하면 메모리가 과부화 될 수 있어서 id만 저장하고 부가 정보 불러옴)
    });

    //필요할 때 복구기능(id를 유저의 전체정보 복구)
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [{
              model: User,
              attributes: ['id', 'nick'],
              as: 'Followers',
            }, {
              model: User,
              attributes: ['id', 'nick'],
              as: 'Followings',
            }],
          })
        .then(user => done(null, user)) //req.user, req.isAuthenticated()
        .catch(err => done(err));
    });

//처음에 등록함
    local();
    kakao();

}