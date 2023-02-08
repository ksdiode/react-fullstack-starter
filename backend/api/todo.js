const router = require('express').Router();
const passport = require('passport');
const createService = require('../controller');
const Todo = require('../models/todo');

const { getPage, getOne, create, update, remove } = createService(Todo);

router
  .get('/', getPage)
  .get('/:_id', getOne)
  .post('/', passport.authenticate('jwt', { session: false }), create)
  .put('/:_id', passport.authenticate('jwt', { session: false }), update)
  .delete('/:_id', passport.authenticate('jwt', { session: false }), remove);

module.exports = router;
