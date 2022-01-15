const express = require('express');
const { Post, User, Hashtag } = require('../models'); 
const res = require('express/lib/response');
const router = express.Router();


router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
});

//use를 하면 모든 라우터에 공통으로 적용됨
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird'});
});

router.get('/join', (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird'});
});

router.get('/', async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
      });
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  router.get('/hashtag', async (req, res, next) => {
    const query = decodeURIComponent(req.query.hashtag);
    if (!query) {
      return res.redirect('/');
    }
    try {
      const hashtag = await Hashtag.findOne({ where: { title: query } });
      let posts = [];
      if (hashtag) {
        posts = await hashtag.getPosts({ include: [{ model: User, attributes: ['id', 'nick'] }] });
      }  //attributes -> 필요한 것만 프론트로 보내기(보안상 해킹당 할 수 있음!!)
  
      return res.render('main', {
        title: `${query} 검색 결과 | NodeBird`,
        twits: posts,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

module.exports = router;