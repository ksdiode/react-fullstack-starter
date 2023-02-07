const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:_id', async (req, res) => {
  const { _id } = req.params;
  const user = await User.findOne({ name: _id });
  console.log(user);
  res.json({ _id });
});

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:_id', async (req, res) => {
  const { _id } = req.params;
  const data = req.body;

  res.json(data);
});

router.delete('/_id', async (req, res) => {
  const { _id } = req.params;
  res.json({ result: 'ok' });
});

module.exports = router;
