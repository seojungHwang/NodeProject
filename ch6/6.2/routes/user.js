const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {  // GET /user/
  res.send('Hello, User');
});

module.exports = router;