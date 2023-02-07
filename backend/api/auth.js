const router = require('express').Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const result = await User.login(req.body);
  res.json(result);
});

module.exports = router;
