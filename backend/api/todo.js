const router = require('express').Router();
const isLogin = require('../middleware/auth');
const createService = require('../controller');
const Todo = require('../models/todo');

const service = createService(Todo);

router
  .get('/', service.getPage)
  .get('/:_id', service.getOne)
  .post('/', isLogin, service.create)
  .put('/:_id', isLogin, service.update)
  .delete('/:_id', isLogin, service.remove);

module.exports = router;
