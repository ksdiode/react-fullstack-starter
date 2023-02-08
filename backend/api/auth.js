const router = require('express').Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const result = await User.login(req.body);
  if (result.isLogin) {
    res.json(result);
  } else {
    res.status(401).json(result);
  }
});

module.exports = router;
