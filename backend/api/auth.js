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

router.post('/signup', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (user) {
    return res
      .status(400)
      .json({ result: 'fail', reason: '이미 사용 중인 사용자 ID입니다.' });
  }

  try {
    const user = new User({ userId, password });
    await user.save();
    return res.json({ result: 'ok', user });
  } catch (e) {
    return res.status(400).json({ result: 'fail', reason: e.message });
  }
});

module.exports = router;
